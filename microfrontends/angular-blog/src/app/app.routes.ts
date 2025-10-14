import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'post/:id', component: BlogPostComponent },
  { path: '**', redirectTo: '' }
];
