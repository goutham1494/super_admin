import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
