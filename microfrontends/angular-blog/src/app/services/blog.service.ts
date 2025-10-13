import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { marked } from 'marked';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private posts = signal<BlogPost[]>([
    {
      id: '1',
      title: 'Arquitectura para la Velocidad: Patrones de Rendimiento Avanzados',
      excerpt:
        'Descubre patrones avanzados de rendimiento en SPAs, desde code splitting hasta virtual scrolling.',
      markdownPath: 'assets/blog/posts/1.md',
      author: 'HiVladius',
      date: new Date('2025-01-15'),
      tags: ['performance', 'spa', 'arquitectura', 'optimización'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      readTime: 25,
    },
    {
      id: '2',
      title: 'Angular + React: Integración Perfecta',
      excerpt: 'Aprende cómo integrar Angular y React en un mismo proyecto usando Web Components.',
      markdownPath: 'assets/blog/posts/2.md',
      author: 'HiVladius',
      date: new Date('2025-02-20'),
      tags: ['angular', 'react', 'web components', 'integración'],
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      readTime: 8,
    },
    {
      id: '3',
      title: 'Optimización de Performance en SPAs',
      excerpt: 'Técnicas avanzadas para mejorar el rendimiento de aplicaciones de página única.',
      markdownPath: 'assets/blog/posts/3.md',
      author: 'HiVladius',
      date: new Date('2025-03-10'),
      tags: ['performance', 'optimización', 'spa', 'best practices'],
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      readTime: 10,
    },
  ]);

  constructor(private http: HttpClient){
    marked.setOptions({
      gfm: true,
      breaks: true,
    })
  }

  getPosts() {
    return this.posts.asReadonly();
  }

  getPostById(id: string) {
    return this.posts().find((post) => post.id === id);
  }

  async getPostContent(post: BlogPost): Promise<string> {
    if (post.content) {
      return post.content;
    }
    
    if (post.markdownPath) {
      const markdown = await this.loadMarkdown(post.markdownPath);
      return marked.parse(markdown) as string;
    }
    
    return '';
  }

  private async loadMarkdown(path: string): Promise<string> {
    try {
      const markdown = await firstValueFrom(this.http.get(path, { responseType: 'text' }));
      return markdown || '';
    } catch (error) {
      console.error('Error loading markdown:', error);
      return 'Error al cargar el contenido.';
    }
  }

  searchPosts(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.posts().filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }

  getPostsByTag(tag: string) {
    return this.posts().filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }
}
