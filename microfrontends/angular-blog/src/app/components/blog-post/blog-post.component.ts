import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule],
  template: `
    <article class="blog-post" *ngIf="post(); else notFound">
      <header class="blog-post__header">
        <button class="back-button" (click)="goBack()">
          ← Volver al blog
        </button>
        
        <div class="blog-post__meta">
          <span class="date">{{ formatDate() }}</span>
          <span class="read-time" *ngIf="post()!.readTime">{{ post()!.readTime }} min lectura</span>
        </div>

        <h1 class="blog-post__title">{{ post()!.title }}</h1>
        
        <div class="blog-post__author">
          <span>Por {{ post()!.author }}</span>
        </div>

        <div class="blog-post__tags">
          <span class="tag" *ngFor="let tag of post()!.tags">#{{ tag }}</span>
        </div>
      </header>

      <div class="blog-post__image" *ngIf="post()!.imageUrl">
        <img [src]="post()!.imageUrl" [alt]="post()!.title" />
      </div>

      <div class="blog-post__content" *ngIf="postContent()" [innerHTML]="postContent()"></div>
      <div class="loading" *ngIf="!postContent()">
        <p>Cargando contenido...</p>
      </div>

      <footer class="blog-post__footer">
        <button class="back-button" (click)="goBack()">
          ← Volver al blog
        </button>
      </footer>
    </article>

    <ng-template #notFound>
      <div class="not-found">
        <h2>Artículo no encontrado</h2>
        <p>Lo sentimos, el artículo que buscas no existe.</p>
        <button class="back-button" (click)="goBack()">
          ← Volver al blog
        </button>
      </div>
    </ng-template>
  `,
  styles: [`
    .blog-post {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
      background: #000000;
      min-height: 100vh;
      color: #ffffff;
    }

    .back-button {
      padding: 0.75rem 1.5rem;
      background: transparent;
      color: #d4d4d8;
      border: 2px solid #3f3f46;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      margin-bottom: 2rem;
    }

    .back-button:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      transform: translateX(-4px);
    }

    .blog-post__header {
      margin-bottom: 2rem;
    }

    .blog-post__meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #9ca3af;
    }

    .blog-post__title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .blog-post__author {
      font-size: 1.125rem;
      color: #9ca3af;
      margin-bottom: 1rem;
    }

    .blog-post__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .tag {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .blog-post__image {
      width: 100%;
      max-height: 500px;
      overflow: hidden;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .blog-post__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .blog-post__content {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #d4d4d8;
    }

    .blog-post__content :deep(h2) {
      font-size: 2rem;
      font-weight: 700;
      margin: 2rem 0 1rem;
      color: #ffffff;
      border-bottom: 2px solid #27272a;
      padding-bottom: 0.5rem;
    }

    .blog-post__content :deep(h3) {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 1.5rem 0 1rem;
      color: #ffffff;
    }

    .blog-post__content :deep(p) {
      margin-bottom: 1.5rem;
      color: #d4d4d8;
    }

    .blog-post__content :deep(ul),
    .blog-post__content :deep(ol) {
      margin: 1.5rem 0;
      padding-left: 2rem;
      color: #d4d4d8;
    }

    .blog-post__content :deep(li) {
      margin-bottom: 0.75rem;
    }

    .blog-post__content :deep(pre) {
      background: #1a1a1a;
      border: 1px solid #27272a;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    .blog-post__content :deep(code) {
      background: #1a1a1a;
      color: #ef4444;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.95em;
      font-family: 'Courier New', monospace;
    }

    .blog-post__content :deep(pre code) {
      background: transparent;
      padding: 0;
      color: #d4d4d8;
    }

    .blog-post__content :deep(blockquote) {
      border-left: 4px solid #ef4444;
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: #9ca3af;
      font-style: italic;
    }

    .blog-post__content :deep(a) {
      color: #ef4444;
      text-decoration: underline;
      transition: color 0.3s ease;
    }

    .blog-post__content :deep(a:hover) {
      color: #fbbf24;
    }

    .blog-post__content :deep(strong) {
      color: #ffffff;
      font-weight: 700;
    }

    .blog-post__content :deep(em) {
      color: #ec4899;
      font-style: italic;
    }

    .blog-post__content :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
    }

    .blog-post__content :deep(hr) {
      border: none;
      border-top: 2px solid #27272a;
      margin: 2rem 0;
    }

    .blog-post__content :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
    }

    .blog-post__content :deep(th),
    .blog-post__content :deep(td) {
      border: 1px solid #27272a;
      padding: 0.75rem;
      text-align: left;
    }

    .blog-post__content :deep(th) {
      background: #1a1a1a;
      color: #ffffff;
      font-weight: 600;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #9ca3af;
      font-size: 1.125rem;
    }

    .blog-post__footer {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
      color: #fbbf24;
    }

    .blog-post__footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #27272a;
    }

    .not-found {
      max-width: 600px;
      margin: 4rem auto;
      text-align: center;
      padding: 2rem;
      background: #1a1a1a;
      border-radius: 12px;
      border: 1px solid #27272a;
    }

    .not-found h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #ffffff;
    }

    .not-found p {
      font-size: 1.125rem;
      color: #9ca3af;
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .blog-post__title {
        font-size: 2rem;
      }

      .blog-post__content {
        font-size: 1rem;
      }

      .blog-post__content :deep(h2) {
        font-size: 1.5rem;
      }

      .blog-post__content :deep(h3) {
        font-size: 1.25rem;
      }
    }
  `]
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
