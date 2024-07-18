import { ITeacher } from "./interfaces/teacher.interface";

export class Teacher implements ITeacher {
  id?: number
  name: string

  constructor(name: string) {
    this.name = name
  }
}