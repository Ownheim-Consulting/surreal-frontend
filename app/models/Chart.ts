import { ChoroplethMap as ChoroplethMapComponent } from "../components/ChoroplethMap";

export class Chart {
    readonly id: number;
    readonly title: string;
    readonly subtitle: string;
    readonly type: any;

    constructor(id: number, title: string, subtitle: string, type: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.type = this.mapType(type);
    }

    mapType(type: string): any {
        switch (type) {
            case "choropleth_map":
                return ChoroplethMapComponent;
            default:
                return undefined;
        }
    }
}

export class MapChart extends Chart {
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

export class ChoroplethMap extends MapChart {
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
        super(id, title, subtitle, type, legendTitle, datasetName, viewingAreaName, datasetLevel);
        this.geoDataUri = geoDataUri;
        this.geoDataFormat = geoDataFormat;
        this.zDataUri = zDataUri;
        this.zDataFormat = zDataFormat;
    }

    static mapResponse(responseData: any) {
        return new this(
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
