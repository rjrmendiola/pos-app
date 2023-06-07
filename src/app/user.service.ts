import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/create`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/delete/${id}`);
  }
}
