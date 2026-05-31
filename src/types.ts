export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  category: 'frontend' | 'backend' | 'fullstack' | 'other';
  metrics?: { label: string; value: string };
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; // 1 to 5
}

export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  text: string;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
