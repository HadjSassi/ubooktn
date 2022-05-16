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
  test: Date = new Date();
  focus;
  focus1;
  ferm = false;
  valid = true;
  email = '';
  ready = true;
  pass = '';
  errorMessage = '';
  isError = false;
  look = false;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    localStorage.removeItem('email');
    firebase.auth().sendPasswordResetEmail(this.email)
  }

  onSubmit(form: NgForm) {
  }

  looks() {
    const x = document.getElementById('pass');
    if (this.look) {
      this.look = false;
      x.type = 'password';
    } else {
      this.look = true;
      x.type = 'text';
    }
  }
}
