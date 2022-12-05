import { Chart as ChartModel } from "../models/Chart";

interface ChartProps {
    type: any;
    obj: ChartModel;
}

export function Chart({ type, obj }: ChartProps) {
    return type(obj);
}
