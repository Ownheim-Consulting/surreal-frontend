import ChartModel from "./ChartModel";

class MapChartModel extends ChartModel {
    readonly legendTitle: string;
    readonly datasetName: string;
    readonly viewingAreaName: string;
    readonly datasetLevel: string;

    constructor(
        id: number,
        title: string,
        subtitle: string,
        type: string,
        legendTitle: string,
        datasetName: string,
        viewingAreaName: string,
        datasetLevel: string
    ) {
        super(id, title, subtitle, type);
        this.legendTitle = legendTitle;
        this.datasetName = datasetName;
        this.viewingAreaName = viewingAreaName;
        this.datasetLevel = datasetLevel;
    }
}

export default MapChartModel;
