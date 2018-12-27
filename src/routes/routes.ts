import {Response} from "express";
import {PredictionService} from "../services/prediction.service";
import {Tensor} from '@tensorflow/tfjs';

export class Routes {
    public routes(app): void {
        app.route('/')
            .get((_req: Request, res: Response) => {
                const predictionService = new PredictionService();
                predictionService.predict().then(
                    (data: Tensor) => {
                        res.status(200).send({
                            message: data.print()
                        })
                    }
                );
            })
    }
}