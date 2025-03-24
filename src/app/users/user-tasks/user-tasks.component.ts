import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  userName = input.required<string>();
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

    const subscription = this.activatedRoute.data.subscribe((data) => console.log(data));

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot) => {
    const usersService = inject(UsersService);
    const uid = activatedRoute.paramMap.get('userId');
    const userName = usersService.users.find(u => u.id === uid)?.name || '';

    return userName;
}