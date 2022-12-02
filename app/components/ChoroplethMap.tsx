import * as d3 from "d3";
import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Plotly from "react-native-plotly";

import * as Model from "../models/Chart";

type d3Csv = d3.DSVRowArray<string>;

export function ChoroplethMap(choroplethMapModel: Model.ChoroplethMap): ReactElement {
    const [chart, setChart] = useState<ReactElement>();
    const [data, setData] = useState<any>();
    const [layout, setLayout] = useState<any>();
    const [config, setConfig] = useState<any>();

    function unpack(rows: d3Csv, key: string) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    useEffect(() => {
        async function processChart(): Promise<void> {
            let geoData: string = choroplethMapModel.geoDataUri;
            let zData: string = choroplethMapModel.zDataUri;
            let rows: d3Csv = await d3.csv(zData);

            if (!rows) {
                console.error("Did not recieve rows from d3.csv call");
                return;
            }

            let data = [
                {
                    type: "choroplethmapbox",
                    geojson: geoData,
                    featureidkey: "id", // The corresponding column in the geojson to the z csv
                    locationmode: "geojson-id",
                    locations: unpack(rows, "fips"), // Corresponding column between the z csv and the geojson
                    z: unpack(rows, "data"), // The column in the z csv that is that data we want to graph
                    text: unpack(rows, "county_name"),
                    hoverinfo: "text+z",
                    colorbar: {
                        thickness: 10,
                        ticks: "inside",
                        ticklen: 5,
                    },
                },
            ];

            let layout = {
                mapbox: {
                    center: {
                        lon: -110,
                        lat: 50,
                    },
                    zoom: 0.8,
                },
                margin: { b: 0, l: 0, r: 0, t: 0 },
            };

            let config = {
                mapboxAccessToken:
                    "pk.eyJ1Ijoib3duaGVpbS1jb25zdWx0aW5nIiwiYSI6ImNsYjQycmhyazA0amczc2wwejd1dDRpeHIifQ.HlHUZoeEkKZN0EAiRgL44g",
                displayModeBar: false,
            };

            setData(data);
            setLayout(layout);
            setConfig(config);
            setChart(<Plotly data={data} layout={layout} config={config} enableFullPlotly />);
        }

        processChart();
    }, []);

    return <View style={{ flex: 1, width: "100%" }}>{chart}</View>;
}
