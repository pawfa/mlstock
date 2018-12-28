import * as parse from 'csv-parse';
import * as fs from "fs";
import {ReadStream} from "fs";
import {Parser} from 'csv-parse';

export class DataService {

    private csvData: string[] = [];
    private path: string = './src//resources/SP500.csv';
    private stream: ReadStream;
    private parser: Parser;

    public configureParser = () => {
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

    public createStream = () => {
        this.stream = fs.createReadStream(this.path);
        return this;
    };

    public loadData = (): Promise<string[]> => {
         return new Promise ((resolve) => {
            this.stream.pipe(this.configureParser()).on('end', () => {
                resolve(this.csvData)
            })
        });
    }

}