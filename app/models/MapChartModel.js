import ChartModel from "./ChartModel";

class MapChartModel extends ChartModel {
    constructor(
        id,
        title,
        subtitle,
        type,
        legendTitle,
        datasetName,
        viewingAreaName,
        datasetLevel
    ) {
        super(id, title, subtitle, type);
        this.legendTitle = legendTitle;
        this.datasetName = datasetName;
        this.viewingAreaName = viewingAreaName;
        this.datasetLevel = datasetLevel;
    }
}

export default MapChartModel;
