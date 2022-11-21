import ChoroplethMap from "../components/ChoroplethMap";

class ChartModel {
    readonly id: number;
    readonly title: string;
    readonly subtitle: string;
    readonly type: any; // Add generic type that extends ChartModel

    constructor(id: number, title: string, subtitle: string, type: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.type = this.mapType(type);
    }

    mapType(type: string): any {
        switch (type) {
            case "choropleth_map":
                return ChoroplethMap;
            default:
                return undefined;
        }
    }

    static mapResponse(responseData) {
        return new ChartModel(
            responseData.id,
            responseData.title,
            responseData.subtitle,
            responseData.type
        );
    }
}

export default ChartModel;
