import { IPosts } from './interfaces/posts.interface'

export class Posts implements IPosts {
  id?: number | undefined;
  title: string;
  content: string;
  professorId: number;

  constructor(title: string, content: string, professorId: number) {
    this.title = title
    this.content = content
    this.professorId = professorId
  }

}