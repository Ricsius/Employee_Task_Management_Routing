import { Component, computed, DestroyRef, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{
  order = input<'asc' | 'desc'>();
  //order?: 'asc' | 'desc';
  userId = input.required<string>();
  userTasks = computed(() => this.tasksService
  .allTasks()
  .filter(t => t.userId === this.userId())
  .sort((a, b) => {
    if (this.order() === 'desc') {
      return a.id > b.id ? -1 : 1
    } else {
      return a.id > b.id ? 1 : -1
    }
  }));

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute, private destroyRef: DestroyRef) {}

  ngOnInit() {
    /*
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.order = params['order'];
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    */
  }
}
