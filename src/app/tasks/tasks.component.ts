import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';
import { Task } from './task/task.model';

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
  userTasks = input.required<Task[]>();

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute, private destroyRef: DestroyRef) {}

  ngOnInit() {
    /*
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.order = params['order'];
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    */
  }
};

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot) => {
    const tasksService = inject(TasksService);
    const userId = activatedRoute.paramMap.get('userId');
    const order = activatedRoute.queryParams['order'];
    const tasks = tasksService.allTasks()
  .filter(t => t.userId === userId)
  .sort((a, b) => {
    if (order === 'desc') {
      return a.id > b.id ? -1 : 1
    } else {
      return a.id > b.id ? 1 : -1
    }
  })
    return tasks;
};
