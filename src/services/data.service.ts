import * as parse from 'csv-parse';
import * as fs from "fs";
import {ReadStream} from "fs";
import {Parser} from 'csv-parse';

interface CSVData {
    dates: string[]
    values: number[]
}

export class DataService {

    private csvData: CSVData = {
        dates: [],
        values: []
    };
    private path: string = './src/resources/SP500low.csv';
    private stream: ReadStream;
    private parser: Parser;
    private max = 0;
    private min = Number.POSITIVE_INFINITY;

    public createStream = () => {
        this.stream = fs.createReadStream(this.path);
        return this;
    };

    public loadData = () => {
        this.stream.pipe(this.configureParser());
        return this;
    };

    public mapData = () => {
        return new Promise(resolve => this.stream.on('end', () => {
            resolve(this.csvData)
        }))
    };

    private configureParser = () => {
        this.parser = parse({
            delimiter: ':'
        });
        this.parser.on('readable', () => {
            let record;
            const tmpDates = [];
            const tmpValues = [];
            this.parser.read();
            while (record = this.parser.read()) {
                const splittedArr = record[0].split(',');
                tmpDates.push(splittedArr[0]);
                tmpValues.push(splittedArr.slice(1,-1));
                this.findMinAndMax(splittedArr.slice(1,-1));
            }

            this.csvData = {
                dates: [].concat(...tmpDates),
                values: [].concat(...tmpValues.map(this.dataMapper)).map(this.normalize)
            };
        });

        return this.parser;
    };

    private dataMapper = (values: string[]): number[] => {
        return values.map((elem: string) => {
                return Number(elem);
            }
        )
    };

    private findMinAndMax = (record: string[]) => {
        record.forEach((elem) => {
            const elemNumber = Number(elem);
            if(elemNumber > this.max) {
                this.max = elemNumber
            }
            if(elemNumber < this.min) {
                this.min = elemNumber
            }
        })
    };

    private normalize = (value: number): number => {
        console.log(this.min)
        console.log(this.max)
        if (this.min === undefined || this.max === undefined) {
            return value;
        }
        return (value - this.min) / (this.max - this.min);
    }
}