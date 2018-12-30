import * as tf from '@tensorflow/tfjs'
import {ModelService} from "./model.service";
import {TrainingService} from "./training.service";
import {DataService} from "./data.service";

export class PredictionService {

    public predict() {
        const dataLoader = new DataService().createStream().loadData().mapData();
        const newModel = new ModelService().buildModel();
        const trainedModel = new TrainingService(newModel, dataLoader).trainModel();

        return trainedModel.then(() => {
             return new Promise(function(resolve) {
                 const prediction = newModel.predict(tf.tensor2d([2], [1,1]));
                    if(!(prediction instanceof Array)) {
                        resolve(prediction);
                    }
             })
        })
    }
}