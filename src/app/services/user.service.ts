import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserObject } from '../views/user-list/user-list-interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'https://ipaas-app.herokuapp.com/users';
  public userForm;

  constructor(private backendServices: HttpClient) {
    this.userForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(null)
    });
  };

  getUsers(params: any = '') {
    return this.backendServices.get<UserObject>(this.baseURL  + `?${params}`);
  };

  createUser(userData: object) {
    return this.backendServices.post(this.baseURL, userData);
  };

  updateUser(userData: any) {
    delete userData.password;
    return this.backendServices.put(this.baseURL + `/${userData._id}`, userData);
  }

}

