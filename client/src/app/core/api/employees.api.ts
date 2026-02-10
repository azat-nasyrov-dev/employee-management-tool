import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { API_BASE_URL } from './api.config';
import { CreateEmployeePayload } from '../models/create-employee.payload';
import { UpdateEmployeePayload } from '../models/update-employee.payload';

@Injectable({ providedIn: 'root' })
export class EmployeesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_BASE_URL}/employees`;

  /**
   * POST /employees
   */
  public createEmployee(payload: CreateEmployeePayload): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, payload);
  }

  /**
   * GET /employees
   */
  public findAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  /**
   * GET /employees/:id
   */
  public findEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  /**
   * PATCH /employees/:id
   */
  public updateEmployeeById(id: string, payload: UpdateEmployeePayload): Observable<Employee> {
    return this.http.patch<Employee>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * DELETE /employees/:id
   */
  public removeEmployeeById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
