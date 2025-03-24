import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveUserName } from "./users/user-tasks/user-tasks.component";
import { routes as userRoutes } from './users/users.routes';
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        data: {
            message: 'Hello!'
        },
        resolve: {
            userName: resolveUserName
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]