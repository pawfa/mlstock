import {Response} from "express";
import {PredictionService} from "../services/prediction.service";
import {Tensor} from '@tensorflow/tfjs';
import {DataService} from "../services/data.service";

export class Routes {
    public routes(app): void {
        app.route('/api/predict')
            .get((_req: Request, res: Response) => {
                const predictionService = new PredictionService();
                predictionService.predict().then(
                    (data: Tensor) => {
                        res.status(200).send({
                            message: data.print()
                        })
                    }
                );
            });
        app.route('/api/data')
            .get((_req: Request, res: Response) => {
                new DataService()
                    .createStream()
                    .loadData()
                    .mapData().then(
                    (data) => {
                        res.status(200).send({
                            data
                        })
                    })
            });
    }
}