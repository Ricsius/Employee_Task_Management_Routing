import { Component, computed, DestroyRef, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  userName = '';
  //userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);
  
  constructor(private destroyRef: DestroyRef, private usersService: UsersService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.activatedRoute);

    const subscription = this.activatedRoute.paramMap.subscribe((paramMap) => {
      const uid = paramMap.get('userId');

      this.userName = this.usersService.users.find(u => u.id === uid)?.name || '';
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
