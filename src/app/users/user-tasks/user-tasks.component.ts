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
  message = input.required<string>();
  
  constructor(private destroyRef: DestroyRef, private usersService: UsersService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log('ActivatedRoute');
    console.log(this.activatedRoute);
    console.log('ActivatedRoute snapshot');
    console.log(this.activatedRoute.snapshot);
    console.log('Static message');
    console.log(this.message());

    const subscription = this.activatedRoute.paramMap.subscribe((paramMap) => {
      const uid = paramMap.get('userId');

      this.userName = this.usersService.users.find(u => u.id === uid)?.name || '';
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
