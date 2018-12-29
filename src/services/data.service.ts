import * as parse from 'csv-parse';
import * as fs from "fs";
import {ReadStream} from "fs";
import {Parser} from 'csv-parse';

export class DataService {

    private csvData: string[][] = [];
    private path: string = './src//resources/SP500.csv';
    private stream: ReadStream;
    private parser: Parser;

    public createStream = () => {
        this.stream = fs.createReadStream(this.path);
        return this;
    };

    public loadData = () => {
        this.stream.pipe(this.configureParser());
        return this;
    };

    public mapData = () => {
        return new Promise ( resolve => this.stream.on('end', () => {
            this.csvData.shift();
            resolve(this.dataMapper(this.csvData))
        }))
    };

    private configureParser = () => {
        this.parser = parse({
            delimiter: ':'
        });
        this.parser.on('readable', () => {
            let record;
            while (record = this.parser.read()) {
                this.csvData.push(record)
            }
        });
        return this.parser;
    };

    private dataMapper(csvData: string[][]): string[][] {
        return csvData.map((data) => data[0].split(','));
    }
}