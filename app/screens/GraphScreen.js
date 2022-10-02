import React, { useEffect } from "react";
import { create } from "apisauce";
import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import graphs from "../config/graph";

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
            keyExtractor={(graph) => graph.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                subTitle={item.details}
                image={item.image.toString()}
              />
            )}
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
});

export default GraphScreen;
