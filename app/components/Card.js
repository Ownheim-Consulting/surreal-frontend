import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import AppText from "./AppText";
import colors from "../config/colors";
import AppPicker from "../components/AppPicker";
import Graph from "../components/Graph";

function Card({ title, subTitle, graph }) {
  return (
    <View style={styles.card}>
      <AppText style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <AppText style={styles.subTitle} numberOfLines={1}>
        {subTitle}
      </AppText>
      <View style={styles.imageView}>
        <InsetShadow>{graph}</InsetShadow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginTop: 20,
    marginHorizontal: 20,
    overflow: "hidden",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: colors.secondary,
    align: "center",
  },
  title: {
    marginBottom: 5,
    align: "center",
    fontWeight: "bold",
    color: colors.dark,
  },
  imageView: {
    borderRadius: 10,
    overflow: "hidden",
    // padding: 10,
    //height: 250,
    flex: 1,
    width: "100%",
    height: "80%",
  },
  shadow: {},
});

export default Card;
