import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(
      'https://6394ae6686829c49e8243706.mockapi.io/employee',
      data
    );
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(
      `https://6394ae6686829c49e8243706.mockapi.io/employee/${id}`,
      data
    );
  }

  getCurrentEmployee(id: number): Observable<any> {
    {
      return this._http.get(
        `https://6394ae6686829c49e8243706.mockapi.io/employee/${id}`
      );
    }
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(
      'https://6394ae6686829c49e8243706.mockapi.io/employee'
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(
      `https://6394ae6686829c49e8243706.mockapi.io/employee/${id}`
    );
  }
}
