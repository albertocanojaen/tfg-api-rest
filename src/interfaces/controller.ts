import { Request, Response } from 'express';

export interface Controller {
    /**
     * Handle the received request
     *
     * @param request
     * @param response
     */
    run(request: Request, response: Response): Promise<void>;
}
