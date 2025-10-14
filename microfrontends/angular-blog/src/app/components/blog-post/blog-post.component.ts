import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog-post',
  imports: [CommonModule],
  styleUrls: ['../../../styles/blogpost.css'],
  template: `
        @if (post()) {
      <article class="blog-post">
        <header class="blog-post__header">
          <button class="back-button" (click)="goBack()">
            ← Volver al blog
          </button>
          
          <div class="blog-post__meta">
            <span class="date">{{ formatDate() }}</span>
            @if (post()!.readTime) {
              <span class="read-time">{{ post()!.readTime }} min lectura</span>
            }
          </div>

          <h1 class="blog-post__title">{{ post()!.title }}</h1>
          
          <div class="blog-post__author">
            <span>Por {{ post()!.author }}</span>
          </div>

          <div class="blog-post__tags">
            @for (tag of post()!.tags; track tag) {
              <span class="tag">#{{ tag }}</span>
            }
          </div>
        </header>

        @if (post()!.imageUrl) {
          <div class="blog-post__image">
            <img [src]="post()!.imageUrl" [alt]="post()!.title" />
          </div>
        }

        @if (postContent()) {
          <div class="blog-post__content" [innerHTML]="postContent()"></div>
        } @else {
          <div class="loading">
            <p>Cargando contenido...</p>
          </div>
        }

        <footer class="blog-post__footer">
          <button class="back-button" (click)="goBack()">
            ← Volver al blog
          </button>
        </footer>
      </article>
    } @else {
      <div class="not-found">
        <h2>Artículo no encontrado</h2>
        <p>Lo sentimos, el artículo que buscas no existe.</p>
        <button class="back-button" (click)="goBack()">
          ← Volver al blog
        </button>
      </div>
    }
  `
})

export class BlogPostComponent {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  postId = signal<string>('');
  post = computed(() => {
    const id = this.postId();
    return id ? this.blogService.getPostById(id) : null;
  });
  postContent = signal<string>('');

  constructor() {
    effect(() => {
      this.route.params.subscribe(async params => {
        this.postId.set(params['id']);
        const currentPost = this.post();
        if (currentPost) {
          const content = await this.blogService.getPostContent(currentPost);
          this.postContent.set(content);
        }
      });
    });
  }

  formatDate = computed(() => {
    const post = this.post();
    if (!post) return '';
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(post.date);
  });

  goBack() {
    this.router.navigate(['/']);
  }

}
