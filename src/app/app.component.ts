import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Point of Sale Application';

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService
  ) { }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public logout(): void {
    this.loginService.logout();
  }

  public isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}