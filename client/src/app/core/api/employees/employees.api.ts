import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employees.models';
import { API_BASE_URL } from '../../configs/api.config';
import { CreateEmployeePayload } from './create-employee.payload';
import { UpdateEmployeePayload } from './update-employee.payload';

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
