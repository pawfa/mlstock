import * as tf from '@tensorflow/tfjs'
import {ModelService} from "./model.service";
import {TrainingService} from "./training.service";

export class PredictionService {

    public predict() {
        const newModel = new ModelService().buildModel();
        const trainedModel = new TrainingService(newModel).trainModel();

        return trainedModel.then(() => {
             return new Promise(function(resolve) {
                 const prediction = newModel.predict(tf.tensor2d([3], [1,1]));
                    if(!(prediction instanceof Array)) {
                        resolve(prediction);
                    }
             })
        })
    }
}