import { Request, Response } from "express";
import { prisma } from "@/prisma";
import { title } from "process";
class QuestionsController {
    async index(request: Request, response: Response) {
        const questions = await prisma.questions.findMany({
            where: {
                title: {
                    contains: request.query.title?.toString().trim(),
                    mode: "insensitive",
                },
            },
            orderBy: {
                title: "asc",
            },
        });

        return response.json(questions);
    }

    async create(request: Request, response: Response) {
        const { title, content, user_id } = request.body;

        const question = await prisma.questions.create({
            data: {
                title,
                content,
                userId: user_id,
            },
        });

        return response.status(201).json(question);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { title, content } = request.body;
        await prisma.questions.update({
            data: {
                title,
                content,
            },
            where: {
                id,
            },
        });
        return response.json();
    }

    async remove(request: Request, response: Response) {
        const { id } = request.params;
        await prisma.questions.delete({
            where: {
                id,
            },
        });

        return response.json();
    }
}

export { QuestionsController };
