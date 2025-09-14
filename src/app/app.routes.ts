import { Routes } from '@angular/router';
import { Update } from './pages/update/update';
import { Detail } from './pages/detail/detail';
import { Main } from './pages/main/main';
import { Add } from './pages/add/add';

export const routes: Routes = [
    {path: '', component: Main},
    {path: 'add', component: Add},
    {path: 'update/:id', component: Update},
    {path: 'detail/:id', component: Detail},
];
