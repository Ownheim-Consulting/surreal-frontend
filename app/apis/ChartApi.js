import axios from "axios";

const baseUrl = "https://space-app-364302.uc.r.appspot.com";

class ChartApi {
    static async getCharts() {
        const url = baseUrl + "/api/v1/chart-service/charts";
        return axios
            .get(url)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async getChart(id) {
        const url = baseUrl + "/api/v1/chart-service/chart/" + id;
        return axios
            .get(url)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }
}

export default ChartApi;
