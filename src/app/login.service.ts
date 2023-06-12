import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8000/api/v1';
  private isLoggedInFlag = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoggedInFlag = this.isAuthenticated(); // Check authentication state on service initializatio
  }

  isLoggedIn() {
    return this.isLoggedInFlag;
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, {
      email: credentials.email,
      password: credentials.password
    }).pipe(
      tap(() => {
        this.isLoggedInFlag = true;
        this.setAuthenticationState(true); // Store authentication state in session storage
      }),
      catchError((error) => {
        this.isLoggedInFlag = false; // Set isLoggedInFlag to false in case of error
        return throwError(error); // Rethrow the error to be handled in the component
      })
    );
  }

  logout(): void {
    // Perform logout logic
    this.isLoggedInFlag = false;

    // Clear authentication state from session storage
    this.setAuthenticationState(false);

    // Additional logout logic (e.g., clearing authentication token)
    this.router.navigateByUrl('/login');
  }

  private isAuthenticated(): boolean {
    const authState = sessionStorage.getItem('isLoggedIn');
    return authState === 'true';
  }

  private setAuthenticationState(isLoggedIn: boolean): void {
    sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}
