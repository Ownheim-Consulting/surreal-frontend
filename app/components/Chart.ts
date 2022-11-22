import * as Model from "../models/Chart";

interface ChartProps {
    type: any;
    obj: Model.Chart;
}

export function Chart({ type, obj }: ChartProps) {
    return type(obj);
}
