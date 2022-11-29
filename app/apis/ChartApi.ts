import axios, { AxiosError, AxiosResponse } from "axios";

import { Chart } from "../models/Chart";

const instance = axios.create({
    baseURL: "https://space-app-364302.uc.r.appspot.com",
    timeout: 10000,
});

const processResponse = (response: AxiosResponse) => {
    return response.data;
};

const handleError = (error: AxiosError) => {
    console.error(error);
    return undefined;
};

const requests = {
    get: (url: string) => instance.get<Chart>(url).then(processResponse).catch(handleError),
};

export const ChartApi = {
    getCharts: (): Promise<Array<Chart> | undefined> =>
        requests.get("/api/v1/chart-service/charts"),
    getChart: (id: number): Promise<Chart | undefined> =>
        requests.get(`/api/v1/chart-service/chart/${id}`),
};
