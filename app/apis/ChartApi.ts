import axios, { AxiosError, AxiosResponse } from "axios";

import { Chart as ChartModel } from "../models/Chart";

const instance = axios.create({
    baseURL: "https://space-app-364302.uc.r.appspot.com",
    timeout: 10000,
});

const processResponse = (response: AxiosResponse) => {
    return response.data;
};

const handleError = (error: AxiosError) => {
    console.error(error);
};

const requests = {
    get: (url: string) => instance.get<ChartModel>(url).then(processResponse).catch(handleError),
};

export const ChartApi = {
    getCharts: (): Promise<Array<ChartModel>> => requests.get("/api/v1/chart-service/charts"),
    getChart: (id: number): Promise<ChartModel> =>
        requests.get(`/api/v1/chart-service/chart/${id}`),
};
