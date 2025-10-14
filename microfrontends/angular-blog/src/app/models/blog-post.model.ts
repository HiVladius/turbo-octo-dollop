export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  markdownPath?: string;
  author: string;
  date: Date;
  tags: string[];  
  imageUrl?: string;
  readTime?: number;
}
export interface Contact extends BlogPost{
  github?: string;
  twitter?: string;
  linkedin?: string;
  contact?: string;
}
