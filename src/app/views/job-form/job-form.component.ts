import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {

  jobForm !: FormGroup;
  id !: String | null;
  isSucess: Boolean = false;
  isError: Boolean = false;

  constructor(private jobServices: JobService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.jobForm = this.jobServices.jobForm;
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onSubmit() {
    if (this.id) {
      this.jobServices.updateJob(this.jobForm.value).subscribe(data => {
        this.isSucess = true;
        this.router.navigate(['/job'])
      }, (e)=>{
        this.isError = true;
      })
    }
    else {
      this.jobServices.createJob(this.jobForm.value).subscribe(data => {
        this.isSucess = true;
        this.jobForm.reset();
      }, (e)=>{
        this.isError = true;
      })
    }
  }

}
