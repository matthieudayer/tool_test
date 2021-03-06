import { Component, OnInit } from '@angular/core';
import { UserManagementStatusService } from '../service/user-management-status.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import * as uikit from 'uikit';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'htm-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  private isLoggedIn;
  private username = '';
  private token = '';
  private token_activation = '';
  private token_recover = '';
  private submitedRecover = false;
  constructor(private userManagementStatusService: UserManagementStatusService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscribe();
  }
  subscribe() {
    this.route.params.subscribe( (params) => {
      if (params.token_activation) {
        this.token_activation = params.token_activation;
        uikit.modal('#modal-activate').show();
      } else if (params.token_recover) {
        this.token_recover = params.token_recover;
        this.submitedRecover = true;
        uikit.modal('#modal-recover').show();
      }
    });

    if (this.userManagementStatusService.getIsUserLogged) {
      this.userManagementStatusService.getIsUserLogged().subscribe((data) => {
        this.isLoggedIn=data;
        if (this.isLoggedIn) this.closeLogin();
        else this.closeAccount();
      });
    }

    if (this.userManagementStatusService.getUserToken)
      this.userManagementStatusService.getUserToken().subscribe((data) => this.token = data);
      
    if (this.userManagementStatusService.getUsername)
      this.userManagementStatusService.getUsername().subscribe((data) =>this.username = data);
  }

  closeAccount() {
    uikit.modal('#modal-account').hide()
  }
  closeLogin() {
    uikit.modal('#modal-login').hide()
  }
}
