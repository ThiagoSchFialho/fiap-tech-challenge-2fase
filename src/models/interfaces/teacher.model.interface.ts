import { Teacher } from "../../entities/teacher.entity";

export interface ITeacherModel {
  listTeachers(): Promise<Teacher[]>
  getTeacher(id: number): Promise<Teacher>
  createTeacher(name: string): Promise<Teacher>
  editTeacher(id: number, name: string): Promise<Teacher>
  // listTeacherAdmin(): Promise<Teacher[]>
  deleteTeacher(id: number): Promise<Teacher>
  // searchTeacher(search: string): Promise<Teacher[]>
}