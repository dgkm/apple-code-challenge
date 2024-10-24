export enum Category {
  performance = 'Peformance',
  quality = 'Quality',
  practices = 'Best Practices',
  security = 'Security',
}

export enum Status {
  pending = 'Pending',
  progress = 'In Progress',
  complete = 'Complete',
}

export interface ChangeLog {
  category: Category;
  issue: string;
  description: string;
  solution: string;
  status: Status;
}
