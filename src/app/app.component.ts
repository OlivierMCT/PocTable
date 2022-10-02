import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { TaskService } from './services/task.service';
import { TaskBll } from './task-bll';
declare var $: (arg: any) => any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public data = [
    { 'id': 0, 'name': 'Item 0', 'price': '$0' },
    { 'id': 1, 'name': 'Item 1', 'price': '$1' },
    { 'id': 2, 'name': 'Item 2', 'price': '$2' },
    { 'id': 3, 'name': 'Item 3', 'price': '$3' },
    { 'id': 4, 'name': 'Item 4', 'price': '$4' },
    { 'id': 5, 'name': 'Item 5', 'price': '$5' }
  ];


  private _tasksList: TaskBll[] = [];
  public get tasksList(): TaskBll[] {
    return this._tasksList;
  }
  public set tasksList(tasksList: TaskBll[]) {
    this._tasksList = tasksList;
    // Mise à jour de la table à chaque fois que la collection évolue
    ($('#myTable') as any).bootstrapTable({data: this._tasksList});
  }

  private _subscriptions: Subscription[] = [];

  constructor(private _taskService: TaskService) {

  }

  public ngAfterViewInit(): void {
    // Avec données en dur (pas de modification de la table car initialisation avec les valeurs)
    // ($('#myTable') as any).bootstrapTable({ data: this.tasks });

    // Avec données suite appel API (table initialisée sans données, puis données mises à jour)
    //($('#myTable') as any).bootstrapTable({ data: this._tasksList });

    // Récupération des donné quand on est sur de pouvoir accéder à la BootstrapTable
    this._subscriptions.push(
      this._taskService.get().pipe(delay(1000)).subscribe({
        next: (data) => {
          console.log(data);
          this.tasksList = data; // Utilisation du set tasksList
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
