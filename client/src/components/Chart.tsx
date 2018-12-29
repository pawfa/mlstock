import * as React from "react";
import {Spinner} from "./Spinner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {XYChart} from '@amcharts/amcharts4/charts';

interface ChartProps {
    data: string[][];
}

interface ChartData {
    date: string
    price: number
}

export class Chart extends React.Component<ChartProps> {
    public state = {
        isFetching: true
    };
    private chart: XYChart;


    public componentDidMount() {
        this.chart = am4core.create("chartdiv", am4charts.XYChart);

        const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "date";

        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Price";

        const series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "price";
        series.dataFields.categoryX = "date";
        series.name = "Sales";
        this.chart.cursor = new am4charts.XYCursor();

        this.chart.events.on('shown', ()=> {
            this.setState({
                isFetching: false
            })
        });
    }

    public render(): React.ReactNode {
        const mappedChartData = this.chartDataMapping(this.props.data);
        if(this.chart) {
            this.chart.data = mappedChartData;
        }

        return <div style={{ width: "70%", margin: '0 auto', height: "500px", position: 'relative' }}>
            <Spinner active={this.state.isFetching}>
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}/>
            </Spinner>
        </div>;
    }

    private chartDataMapping = (chartData: string[][] = []): ChartData[]  => {
         return chartData.map((data: string[]) => ({date: data[0], price: Number(data[1])}))
    }
}


