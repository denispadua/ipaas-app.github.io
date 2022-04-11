import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: String[] = ['Nome', 'Email', 'Telefone', '#']
  userData!: any
  totalRows: number = 0;
  selectValue: String = 'name';
  searchValue!: String;
  isError: Boolean = false;
  filter!: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userServices: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userServices.getUsers(`page=0&limit=5`).subscribe((data: any) => {
      console.log(data)
      this.userData = new MatTableDataSource(data.user);
      this.userData.paginator = this.paginator;
      this.totalRows = data.size;
    },(e)=>{
      this.isError = true;
    });
  }

  getSearch() {
    this.paginator.pageIndex = 0;

    this.filter = `${this.selectValue}=${this.searchValue}&page=${this.paginator.pageIndex}&limit=${this.paginator.pageSize}`

    this.userServices.getUsers(this.filter).subscribe(data => {
      this.userData = new MatTableDataSource(data.user);
      this.totalRows = data.size;
    },(e)=>{
      this.isError = true;
    })
  }
  ngAfterViewInit() { }

  paginatorPosition() {
    if (this.searchValue) {
      this.filter = `${this.selectValue}=${this.searchValue}&page=${this.paginator.pageIndex}&limit=${this.paginator.pageSize}`
    }
    else {
      this.filter = `page=${this.paginator.pageIndex}&limit=${this.paginator.pageSize}`
    }
    this.userServices.getUsers(this.filter).subscribe(data => {
      this.userData = new MatTableDataSource(data.user);
      this.filter = ''
    },(e)=>{
      this.isError = true;
    })
  }

  updateUser(user: any) {
    this.userServices.userForm.patchValue(user)
    this.router.navigate(['../user/', this.userServices.userForm.value._id]);
  }

  createUser() {
    this.userServices.userForm.reset();
    this.router.navigate(['../user/create']);
  }

}
