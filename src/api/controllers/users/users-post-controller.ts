import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class UsersPostController {
    /**
     * Class constructor
     *
     */
    constructor() {}

    static run(req: Request, res: Response): UsersPostController {
        res.send('hola');
        return new UsersPostController();
    }
}
