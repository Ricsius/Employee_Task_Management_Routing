import { Routes } from "@angular/router";
import { TasksComponent, resolveUserTasks } from "../tasks/tasks.component";
import { NewTaskComponent, canLeaveEditPage } from "../tasks/new-task/new-task.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks',
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
            userTasks: resolveUserTasks
        }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
    }
]