import { Request, Response } from 'express';
import { Todo } from '../model/Todo';

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll({});

    res.json({ list });
}

export const add = async (req: Request, res: Response) => {
    if(req.body.title) {
        const newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? 1 : 0
        });

        res.status(201).json({ item: newTodo });
    }

    res.json({
        error: 'Dados não enviados'
    });
}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if(todo) {
        if(req.body.title) {
            todo.title = req.body.title;
        }

        if(req.body.done) {
            switch(req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = 1;
                    break;
                case 'false':
                case '0':
                    todo.done = 0;
                    break;
            }
        }

        await todo.save();
        res.json({ item: todo });
    } else {
        res.status(400).json({ error: 'Item não encontrado...' });
    }
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if(todo) {
        await todo.destroy();
    }
    
    res.status(200).json({});
}