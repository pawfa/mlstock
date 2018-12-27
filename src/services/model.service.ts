import * as tf from '@tensorflow/tfjs'
import {Sequential} from '@tensorflow/tfjs';

export class ModelService {
    private model;

    constructor() {
        this.model = tf.sequential();
    }

    public buildModel(): Sequential {
        this.model.add(tf.layers.dense({units: 1, inputShape: [1]}));
        this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

        return this.model;
    }
}