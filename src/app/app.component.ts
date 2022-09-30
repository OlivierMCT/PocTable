import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
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

  ngAfterViewInit(): void {
    ($('#myTable') as any).bootstrapTable({data: this.data});
  }
}
