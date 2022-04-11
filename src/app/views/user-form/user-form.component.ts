import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  id!: String | null;
  isPasswordEnable: Boolean = true;
  isSucess: Boolean = false;
  isError: Boolean = false;

  constructor(private userServices: UserService, private route: ActivatedRoute, private router: Router) {
    this.form = this.userServices.userForm;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isPasswordEnable = this.id ? false : true;
  }

  onSubmit() {
    if (this.id) {
      this.userServices.updateUser(this.form.value).subscribe((data) => {
        this.isSucess = true;
        this.router.navigate(['/user'])
      }, (e)=>{
        this.isError = true;
      })
    }
    else {
      delete this.form.value._id;
      this.userServices.createUser(this.form.value).subscribe(data => {
        this.form.reset();
        this.isSucess = true;
      },
      (e)=>{
        this.isError = true;
      })
    }
  }
}