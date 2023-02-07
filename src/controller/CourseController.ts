import { Request, Response } from "express";
import { CourseBusiness } from "../business/CourseBusinnes";
import { BaseError } from "../errors/BaseError";

export class CourseController {
    public getCourses = async (req: Request, res: Response) => {
        try {
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourses()

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createCourse = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }

            const courseBusinnes = new CourseBusiness()
            const output = await courseBusinnes.createCourse(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteCourse = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.deleteCourse(id)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public updateCourse = async (req: Request, res: Response) =>{
        try {
            const idToEdit = req.params.id
            
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.updateCourse(idToEdit, input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}