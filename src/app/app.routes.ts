import { Routes } from '@angular/router';
import { AsyncDemo } from './pages/async-demo/async-demo';
import { CallApi } from './pages/call-api/call-api';
import { Postput } from './pages/postput/postput';
import { Delete } from './pages/delete/delete';
import { Update } from './pages/update/update';
import { Upload } from './pages/upload/upload';

export const routes: Routes = [
    {path: '', component: AsyncDemo },
    {path: 'callapi', component: CallApi},
    {path: 'put', component: Postput},
    {path: 'delete', component: Delete},
    {path: 'update/:id', component: Update},
    {path: 'upload', component: Upload},
];
