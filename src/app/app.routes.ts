import { Routes } from '@angular/router';
import { AuthorComponent } from './components/author/author.component';
import { TitleComponent } from './components/title/title.component';

export const routes: Routes = [
  {
    path: 'author/:authorName',
    component: AuthorComponent,
  },
  {
    path: 'title/:titleName',
    component: TitleComponent,
  },
];
