import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule, RouterLink],
  template: `
    <article class="blog-card">
      <div class="blog-card__image" *ngIf="post().imageUrl">
        <img [src]="post().imageUrl" [alt]="post().title" />
      </div>
      <div class="blog-card__content">
        <div class="blog-card__meta">
          <span class="date">{{ formatDate() }}</span>
          <span class="read-time" *ngIf="post().readTime">{{ post().readTime }} min lectura</span>
        </div>
        <h3 class="blog-card__title">{{ post().title }}</h3>
        <p class="blog-card__excerpt">{{ post().excerpt }}</p>
        <div class="blog-card__tags">
          <span class="tag" *ngFor="let tag of post().tags">#{{ tag }}</span>
        </div>
        <div class="blog-card__footer">
          <span class="author">Por {{ post().author }}</span>
          <a [routerLink]="['post', post().id]" class="read-more">Leer más →</a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .blog-card {
      background: #1a1a1a;
      border: 1px solid #27272a;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .blog-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
      border-color: #ef4444;
    }

    .blog-card__image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .blog-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .blog-card:hover .blog-card__image img {
      transform: scale(1.05);
    }

    .blog-card__content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .blog-card__meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      color: #9ca3af;
    }

    .blog-card__title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #ffffff;
      line-height: 1.3;
    }

    .blog-card__excerpt {
      color: #d4d4d8;
      line-height: 1.6;
      margin-bottom: 1rem;
      flex: 1;
    }

    .blog-card__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 20px;
      font-size: 0.875rem;
      color: #ef4444;
    }

    .blog-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #27272a;
    }

    .author {
      font-size: 0.875rem;
      color: #9ca3af;
    }

    .read-more {
      color: #ef4444;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      background: rgba(239, 68, 68, 0.1);
    }

    .read-more:hover {
      background: #ef4444;
      color: #ffffff;
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .blog-card__title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class BlogCardComponent {
  post = input.required<BlogPost>();

  formatDate = computed(() => {
    const date = this.post().date;
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  });
}
