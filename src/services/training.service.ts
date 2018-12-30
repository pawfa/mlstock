import {Sequential} from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs'

export class TrainingService {
    private xs = tf.tensor2d([18.709999, 18.690001], [2,1]);
    private ys = tf.tensor2d([23, 24], [2, 1]);

    constructor(private model: Sequential, dataLoader: Promise<{}>) {
        dataLoader.then(() => console.log())
    }

    trainModel() {
        return this.model.fit(this.xs, this.ys, {epochs: 500});
    }
}