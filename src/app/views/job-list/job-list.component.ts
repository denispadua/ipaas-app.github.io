import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { JobService } from 'src/app/services/job.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  displayedColumns: String[] = ['Nome', 'Usuário', 'Status', 'Tipo de recorrência', 'Valor da recorrência', 'Intervalo', 'Horário', '#'];
  jobData!: MatTableDataSource<any>;
  jobForm: FormGroup;
  pageSize!: number;
  length!: number;
  filter!: String;
  searchValue: String = ''
  selectValue: String = 'user'
  isError: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private jobServices: JobService, private router: Router) { 
    this.jobForm = this.jobServices.jobForm;
  }


  delay = (ms:any) => new Promise(res => setTimeout(res, ms));

  ngOnInit(): void {
    this.jobServices.getJobs(`?page=0&limit=5`).subscribe((data: any) => {
      this.jobData = new MatTableDataSource(data.data);
      this.jobData.paginator = this.paginator;
      this.length = data.size;
    },(e)=>{
      this.isError = true;
    })
  }

  getSearch() {
    this.paginator.pageIndex = 0;

    this.filter = `?${this.selectValue}=${this.searchValue}&page=${this.paginator.pageIndex}&limit=${this.paginator.pageSize}`
    
    this.jobServices.getJobs(this.filter).subscribe((data: any) => {
      this.jobData = new MatTableDataSource(data.data);
      this.length = data.size;
    },(e)=>{
      this.isError = true;
    })
  }

  createJob() {
    this.jobServices.jobForm.reset();
    this.router.navigate(['../job/create']);
  }

  updateJob(job: any) {
    this.jobServices.jobForm.patchValue(job);
    this.router.navigate(['../job/', this.jobServices.jobForm.value._id]);
  }

  paginatorPosition() {
    if (this.searchValue) {
      this.filter = `?${this.selectValue}=${this.searchValue}&page=${this.paginator.pageIndex}&limit=${this.paginator.pageSize}`
    }
    else {
      this.filter = `?page=${this.paginator.pageIndex}&limit=${this.paginator.pageSize}`
    }
    this.jobServices.getJobs(this.filter).subscribe((data: any) => {
      this.jobData = new MatTableDataSource(data.data);
      this.filter = ''
    },(e)=>{
      this.isError = true;
    })
  }
}
