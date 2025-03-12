import { Component, computed, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  userId = input.required<string>();
  userTasks = computed(() => this.tasksService.allTasks().filter(t => t.userId === this.userId()));

  constructor(private tasksService: TasksService) {}
}
