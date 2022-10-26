import React, { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
} from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import Graph from "../components/Graph";
import ChoroplethMap from "../components/ChoroplethMap";

class GraphSelection {
  constructor(title, subTitle, url, type) {
    this.title = title;
    this.subTitle = subTitle;
    this.url = url;
    this.type = type;
  }
}

const graphs = [
  {
    id: 1,
    graphSelection: new GraphSelection(
      "USA % Unemployment By County",
      "Data is Sourced from the U.S. Census Bureau",
      "/api/chart/choropleth-map/dataset/UNEMP/viewing-area/USA/level/COUNTY",
      ChoroplethMap
    ),
  },
  {
    id: 2,
    graphSelection: new GraphSelection(
      "USA % Unemployment By County",
      "Data is Sourced from the U.S. Census Bureau",
      "/api/chart/choropleth-map/dataset/UNEMP/viewing-area/USA/level/COUNTY",
      ChoroplethMap
    ),
  },
];

function GraphScreen() {
  return (
    <Screen style={styles.screen}>
      <ImageBackground
        styles={styles.background}
        source={require("../assets/background.png")}
        style={styles.image}
      >
        <TouchableWithoutFeedback>
          <FlatList
            //showVerticalScrollIndicator={false}
            data={graphs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              let graph = (
                <Graph
                  type={item.graphSelection.type}
                  url={item.graphSelection.url}
                />
              );
              return (
                <Card
                  title={item.graphSelection.title}
                  subTitle={item.graphSelection.subTitle}
                  graph={graph}
                />
              );
            }}
          />
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
  },
  image: {
    //backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-end",
  },
  chartRow: {
    flex: 1,
    width: "100%",
  },
  container: {
    paddingTop: 30,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GraphScreen;

{
  /* <View style={styles.container}>
          {graphSelections.map((g, index) => {
            return (
              <View className="App">
                {graphSelections.map((g, index) => {
                  let graph = <Graph type={g.type} url={g.url} />;
                  return (
                    <View key={index}>
                      <Card
                        title={g.title}
                        subTitle={g.subTitle}
                        graph={graph}
                      />
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View> */
}
