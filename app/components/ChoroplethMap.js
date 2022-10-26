import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import * as d3 from "d3";
import axios from "axios";
import Plotly from "react-native-plotly";

function ChoroplethMap(url) {
  const [graph, setGraph] = useState();

  useEffect(() => {
    async function getGraph(url) {
      console.log(url);
      return axios
        .get(url)
        .then((response) => {
          let geoData = response.data.geojson_uri;
          let zData = response.data.zjson_uri;

          return [geoData, zData];
        })
        .catch((err) => {
          console.error(err);
          return [undefined, undefined];
        });
    }

    async function processGraph(url) {
      let [geoData, zData] = await getGraph(url);

      d3.csv(zData)
        .then(function (rows) {
          function unpack(rows, key) {
            return rows.map(function (row) {
              return row[key];
            });
          }

          let data = [
            {
              type: "choropleth",
              geojson: geoData,
              featureidkey: "id", // The corresponding column in the geojson to the z csv
              locationmode: "geojson-id",
              locations: unpack(rows, "fips"), // Corresponding column between the z csv and the geojson
              z: unpack(rows, "unemp"), // The column in the z csv that is that data we want to graph
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

          setGraph(
            <Plotly
              data={data}
              layout={layout}
              config={config}
              enableFullPlotly
              debug
            />
          );
        })
        .catch((error) => console.error(error));
    }

    // Handle initial load of componenet when graph is undefined
    if (!graph) {
      processGraph(url);
    }
  }, [graph, url]);

  return <View style={styles.chartRow}>{graph}</View>;
}

const styles = StyleSheet.create({
  chartRow: {
    flex: 1,
    width: "100%",
  },
});
export default ChoroplethMap;
