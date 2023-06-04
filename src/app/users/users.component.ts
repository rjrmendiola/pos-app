import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | undefined;
  // By using the "!" non-null assertion operator, 
  // we inform TypeScript that the userForm property will be initialized in the initUserForm() method.
  userForm!: FormGroup;
  deleteUserId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService, 
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.getUsers();
  }

  initUserForm(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  openModal(content: any, user?: User): void {
    this.selectedUser = user ? { ...user } : undefined;
    if (this.selectedUser) {
      // Exclude password field during edit
      const { password, ...userWithoutPassword } = this.selectedUser;
      this.userForm.reset(userWithoutPassword);
    } else {
      this.userForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDeleteConfirmationModal(content: any, userId: number): void {
    this.deleteUserId = userId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  saveUser(user: User): void {
    // Mark form controls as touched
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });

    if (this.userForm.invalid) {
      return;
    }

    if (user.id) {
      this.userService.updateUser(user)
        .subscribe(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
    } else {
      this.userService.createUser(user)
        .subscribe(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
    }
  }

  deleteUser(): void {
    if (this.deleteUserId) {
      this.userService.deleteUser(this.deleteUserId)
        .subscribe(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
    }
  }
}
