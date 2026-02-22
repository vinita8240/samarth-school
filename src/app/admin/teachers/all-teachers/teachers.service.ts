import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Teachers } from './teachers.model';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private readonly API_URL = 'assets/data/teachers.json';
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);

  constructor(private httpClient: HttpClient) {}

  /** GET: Fetch all teachers */
  getAllTeachers(): Observable<Teachers[]> {
    return this.httpClient
      .get<Teachers[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  /** POST: Add a new teacher */
  addTeacher(teacher: Teachers): Observable<Teachers> {
    return this.httpClient.post<Teachers>(this.API_URL, teacher).pipe(
      map((response) => {
        return teacher; // return teacher from API
      }),
      catchError(this.handleError)
    );
  }

  /** PUT: Update an existing teacher */
  updateTeacher(teacher: Teachers): Observable<Teachers> {
    return this.httpClient.put<Teachers>(`${this.API_URL}`, teacher).pipe(
      map((response) => {
        return teacher; // return teacher from API
      }),
      catchError(this.handleError)
    );
  }

  /** DELETE: Remove a teacher by ID */
  deleteTeacher(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
      map(() => {
        return id; // return the ID of the deleted teacher
      }),
      catchError(this.handleError)
    );
  }

  /** Handle Http operation that failed */
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
