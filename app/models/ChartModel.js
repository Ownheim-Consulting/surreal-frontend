class ChartModel {
    constructor(id, title, subtitle, type) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.type = type;
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
