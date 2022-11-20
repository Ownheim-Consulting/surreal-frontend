import MapChartModel from "./MapChartModel";
import ChoroplethMap from "../components/ChoroplethMap";

class ChoroplethMapModel extends MapChartModel {
    constructor(
        id,
        title,
        subtitle,
        type,
        legendTitle,
        datasetName,
        viewingAreaName,
        datasetLevel,
        geoDataUri,
        geoDataFormat,
        zDataUri,
        zDataFormat
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

    static mapResponse(responseData) {
        if (responseData.type === "choropleth_map") {
            responseData.type = ChoroplethMap;
        }
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
