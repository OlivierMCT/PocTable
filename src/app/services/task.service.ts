import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { TaskBll } from 'src/app/task-bll';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  public get(): Observable<TaskBll[]> {
    return this._http.get<TaskBll[]>('assets/data-tasks.json');
  }
}
