import {Sequential} from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs'

export class TrainingService {
    private xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    private ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    constructor(private model: Sequential) {}

    trainModel() {
        return this.model.fit(this.xs, this.ys, {epochs: 500});
    }
}