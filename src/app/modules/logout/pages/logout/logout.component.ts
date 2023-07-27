import { Component, OnInit } from '@angular/core';

import { AuthJwtService } from 'src/app/core/services/authJwt.service';
import { AuthappService } from 'src/app/core/services/authapp.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthJwtService) { }

  ngOnInit(): void {
    this.auth.clearAll();
  }

}
