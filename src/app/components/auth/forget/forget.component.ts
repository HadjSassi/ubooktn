import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';
import {User} from '../../../model/User';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

}
