import { Course } from "../models/Course";
import { CourseDB } from "../types";
import { BaseDatabase } from "./Basedatabase";

export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourse(){
        const courseDB: CourseDB[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)

        return courseDB
    }

    public async findCourseById(id: string){
        const [courseDB]: CourseDB[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .where({id})

        return courseDB
    }

    public async insertCourse(newCourseDB: CourseDB){
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    public async updateCourse(id: string, newCourse: Course){
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .update(newCourse)
            .where({id})
    }

    public async deleteCourse(id: string){
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .del()
            .where({id})
    }


}