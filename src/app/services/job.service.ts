import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseURL = 'https://ipaas-app.herokuapp.com/jobs';
  jobForm: FormGroup;

  constructor(private backendServices: HttpClient) {
    this.jobForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl(''),
      user: new FormControl(''),
      status: new FormControl(''),
      recurrenceType: new FormControl(''),
      recurrenceValue: new FormControl(''),
      interval: new FormControl(''),
      time: new FormControl(''),
    });
  }


  getJobs(params: any = '') {
    return this.backendServices.get(this.baseURL + params)
  }

  createJob(job: any) {
    delete job._id;
    return this.backendServices.post(this.baseURL, job)
  }

  updateJob(job: any) {
    return this.backendServices.put(this.baseURL + `/${job._id}`, job);
  }
}
