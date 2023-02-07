import { CourseDatabase } from "../database/CourseDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Course } from "../models/Course"
import { CourseDB } from "../types"

export class CourseBusiness {
    public getCourses =async () => {
        const courseDatabase = new CourseDatabase()
        const coursesDB: CourseDB[] = await courseDatabase.findCourse()

        const courses = coursesDB.map((courseDB) => new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        ))

        return courses
    }

    public createCourse = async (input: any) =>{
        const {id, name, lessons} = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof lessons !== "number") {
            throw new BadRequestError("'lessons' deve ser string")
        }

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if(courseDBExists){
            throw new BadRequestError("'id' já existe")            
        }

        const newCourse = new Course(
            id,
            name,
            lessons
        )

        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await courseDatabase.insertCourse(newCourseDB)

        const output = {
            message: "Curso registrado com sucesso",
            course: newCourse
        }

        return output
    }

    public deleteCourse = async (idToDelete: string) =>{
        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCourseById(idToDelete)

        if(!courseDB){
            throw new NotFoundError("'id' não encontrada")
        }

        await courseDatabase.deleteCourse(idToDelete)

        const output = {
            message: "Curso excluido com sucesso"
        }

        return output
    }

    public updateCourse = async (idToEdit: string, input: any) => {
        const {id, name, lessons} = input

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new BadRequestError("'id' deve ser string")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new BadRequestError("'name' deve ser string")
            }
        }

        if (lessons !== undefined) {
            if (typeof lessons !== "number") {
                throw new BadRequestError("'lessons' deve ser number")
            }
        }

        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCourseById(idToEdit)

        if(!courseDB){
            throw new NotFoundError("'curso' não encontrado")
        }

        const newCourse = new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        )

        newCourse.setId(id)
        newCourse.setName(name)
        newCourse.setLessons(lessons)

        await courseDatabase.updateCourse(idToEdit, newCourse)

        const output ={
            message: "Curso atualizado com sucesso",
            newCourse
        }

        return output
    }
}