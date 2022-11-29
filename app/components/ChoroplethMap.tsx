import * as d3 from "d3";
import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Plotly from "react-native-plotly";

import * as Model from "../models/Chart";

type d3Csv = d3.DSVRowArray<string>;

export function ChoroplethMap(choroplethMapModel: Model.ChoroplethMap) {
    const [chart, setChart] = useState<ReactElement>();

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
                    type: "choropleth",
                    geojson: geoData,
                    featureidkey: "id", // The corresponding column in the geojson to the z csv
                    locationmode: "geojson-id",
                    locations: unpack(rows, "fips"), // Corresponding column between the z csv and the geojson
                    z: unpack(rows, "data"), // The column in the z csv that is that data we want to graph
                    text: unpack(rows, "county_name"),
                    hoverinfo: "text+z",
                    colorbar: {
                        thickness: 10,
                    },
                },
            ];

            let layout = {
                autosize: true,
                geo: {
                    scope: "usa",
                },
                margin: { b: 0, l: 0, r: 0, t: 0 },
                dragmode: false,
            };

            let config = {
                displayModeBar: true,
                scrollZoom: false,
                modeBarButtonsToRemove: ["toImage", "lasso2d", "select2d"],
                displaylogo: false,
                responsive: false,
            };

            setChart(<Plotly data={data} layout={layout} config={config} enableFullPlotly debug />);
        }

        // Handle initial load of component when chart is undefined
        if (!chart) {
            processChart();
        }
    }, [chart]);

    return <View style={styles.chartRow}>{chart}</View>;
}

const styles = StyleSheet.create({
    chartRow: {
        flex: 1,
        width: "100%",
    },
});
