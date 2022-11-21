import MapChartModel from "./MapChartModel";

class ChoroplethMapModel extends MapChartModel {
    readonly geoDataUri: string;
    readonly geoDataFormat: string;
    readonly zDataUri: string;
    readonly zDataFormat: string;

    constructor(
        id: number,
        title: string,
        subtitle: string,
        type: string,
        legendTitle: string,
        datasetName: string,
        viewingAreaName: string,
        datasetLevel: string,
        geoDataUri: string,
        geoDataFormat: string,
        zDataUri: string,
        zDataFormat: string
    ) {
        super(
            id,
            title,
            subtitle,
            type,
            legendTitle,
            datasetName,
            viewingAreaName,
            datasetLevel
        );
        this.geoDataUri = geoDataUri;
        this.geoDataFormat = geoDataFormat;
        this.zDataUri = zDataUri;
        this.zDataFormat = zDataFormat;
    }

    static mapResponse(responseData: any) {
        return new ChoroplethMapModel(
            responseData.id,
            responseData.title,
            responseData.subtitle,
            responseData.type,
            responseData.legend_title,
            responseData.dataset_name,
            responseData.viewing_area_name,
            responseData.dataset_level,
            responseData.geo_data_uri,
            responseData.geo_data_format,
            responseData.z_data_uri,
            responseData.z_data_format
        );
    }
}

export default ChoroplethMapModel;
