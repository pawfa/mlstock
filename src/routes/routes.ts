import {Response} from "express";

export class Routes {
    public routes(app): void {
        app.route('/')
            .get((_req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })
    }
}