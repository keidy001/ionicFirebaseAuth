import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public userList: Observable<User[]>;

  constructor(
    private autservice: AuthService,

  ) { }

  ngOnInit() {
    this.userList = this.autservice.getuserList();
  }

}
