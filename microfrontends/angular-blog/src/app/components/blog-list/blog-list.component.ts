import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogCardComponent } from './blog-card.component';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, FormsModule, BlogCardComponent],
  template: `
    <div class="blog-list">
      <header class="blog-list__header">
        <h1>Blog de Desarrollo</h1>
        <p class="subtitle">Artículos, tutoriales y recursos sobre desarrollo web</p>
      </header>

      <div class="blog-list__filters">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Buscar artículos..." 
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <div class="tags-filter" *ngIf="allTags().length > 0">
          <button 
            class="tag-button" 
            [class.active]="selectedTag() === null"
            (click)="filterByTag(null)"
          >
            Todos
          </button>
          <button 
            *ngFor="let tag of allTags()" 
            class="tag-button"
            [class.active]="selectedTag() === tag"
            (click)="filterByTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="blog-list__results" *ngIf="filteredPosts().length > 0">
        <p class="results-count">{{ filteredPosts().length }} artículo(s) encontrado(s)</p>
      </div>

      <div class="blog-list__grid" *ngIf="filteredPosts().length > 0">
        <app-blog-card *ngFor="let post of filteredPosts()" [post]="post" />
      </div>

      <div class="blog-list__empty" *ngIf="filteredPosts().length === 0">
        <p>No se encontraron artículos</p>
      </div>
    </div>
  `,
  styles: [`
    .blog-list {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
      background: #000000;
      min-height: 100vh;
    }

    .blog-list__header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .blog-list__header h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #9ca3af;
    }

    .blog-list__filters {
      margin-bottom: 2rem;
    }

    .search-box {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem 3rem 1rem 1rem;
      font-size: 1rem;
      background: #1a1a1a;
      color: #ffffff;
      border: 2px solid #3f3f46;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .search-input::placeholder {
      color: #71717a;
    }

    .search-input:focus {
      outline: none;
      border-color: #ef4444;
      background: #27272a;
    }

    .search-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.25rem;
      color: #71717a;
    }

    .tags-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .tag-button {
      padding: 0.5rem 1rem;
      background: transparent;
      border: 2px solid #3f3f46;
      color: #d4d4d8;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .tag-button:hover {
      border-color: #ef4444;
      color: #ef4444;
      transform: translateY(-2px);
    }

    .tag-button.active {
      background: linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #fbbf24 100%);
      color: white;
      border-color: transparent;
    }

    .blog-list__results {
      margin-bottom: 1rem;
    }

    .results-count {
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .blog-list__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .blog-list__empty {
      text-align: center;
      padding: 4rem 2rem;
      color: #9ca3af;
      font-size: 1.125rem;
    }

    @media (max-width: 768px) {
      .blog-list__header h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .blog-list__grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class BlogListComponent {
  private blogService = inject(BlogService);

  searchQuery = '';
  selectedTag = signal<string | null>(null);

  allPosts = this.blogService.getPosts();

  allTags = computed(() => {
    const tags = new Set<string>();
    this.allPosts().forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  filteredPosts = computed(() => {
    let posts = this.allPosts();

    // Filtrar por tag
    const tag = this.selectedTag();
    if (tag) {
      posts = posts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Filtrar por búsqueda
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    return posts;
  });

  onSearch() {
    // La búsqueda se actualiza automáticamente a través del computed signal
  }

  filterByTag(tag: string | null) {
    this.selectedTag.set(tag);
  }
}
