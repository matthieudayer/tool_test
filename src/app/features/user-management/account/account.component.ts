import { color_usedspace, color_unusedspace, labels_diskspacechart, diskspacechart_options } from './../../../shared/data.service';
import { UserManagementStatusService } from './../service/user-management-status.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../service/user-management.service';
import { WaitingStatusComponent } from 'app/shared/component/waiting-status';
import { ToasterService } from 'app/shared';
import { InteractionService } from 'app/shared/services/interaction.service';

@Component({
  selector: 'htm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends WaitingStatusComponent implements OnInit {
  @Input() username;
  @Input() token;
  private firstname='';
  private lastname='';
  private isEditable = false;
  private diskspaceUsed;
  private diskspaceMax;
  private diskspaceLabels = labels_diskspacechart;
  private diskspaceDataset;
  private diskspaceOptions = diskspacechart_options;
  constructor(private userManagementService: UserManagementService, private userManagementStatusService: UserManagementStatusService,
    private toasterService: ToasterService, private interactionService: InteractionService) {
    super()
  }

  ngOnInit() {
    this.getAcountInformation();
  }

  logout() {
    this.setWaitingStatus(true)
    this.userManagementService.userLogout(this.token).then((data) => {
      this.toasterService.showToaster(data.message)
      this.userManagementStatusService.setUsername(null);
      this.userManagementStatusService.setUserIsLoggedOut();
      this.userManagementStatusService.setUserToken(null);

      this.interactionService.disableButtonWithId('save');
      this.interactionService.disableButtonWithId('folder');

    }).catch(() => {
      this.setWaitingStatus(false)
    })
  }
  setUserIsLoggedOut() {
    this.setWaitingStatus(false)
    this.userManagementStatusService.setUserIsLoggedOut()
  }
  getAcountInformation() {
    this.getUserInformations()
    if (this.userManagementService.getDiskSpace)
    this.userManagementService.getDiskSpace(this.token).then((data) => {
      this.diskspaceMax = data.max_size;
      this.diskspaceUsed = data.used_size;
      this.diskspaceDataset = [{
        label: 'Account disk',
        backgroundColor: [ color_usedspace, color_unusedspace],
        data: [this.diskspaceUsed,this.diskspaceMax-this.diskspaceUsed]
      }];
    });
  }
  getAcountFileList() {
    this.userManagementService.getAcountFileList(this.token).then((data) => {
    })
  }
  toggleEditing() {
    this.isEditable = !this.isEditable;
  }
  disableEditing() {
    this.getUserInformations();
    this.toggleEditing()
  }
  getUserInformations() {
    if (this.userManagementService.getUserInformations)
    this.userManagementService.getUserInformations(this.token).then((data) => {
      this.firstname = data.first_name;
      this.lastname = data.last_name;
    })
  }
  updateProfile() {
    const payload = {token:this.token, last_name:this.lastname, first_name: this.firstname};
    this.userManagementService.userUpdateProfile(payload).then((data) => {
      this.toasterService.showToaster(data.message);
      this.getUserInformations();
      this.toggleEditing()
    })
  }
}
