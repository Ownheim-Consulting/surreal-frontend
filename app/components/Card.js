import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function Card({ title, subTitle, image }) {
  return (
    <View style={styles.card}>
      <AppText style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <AppText style={styles.subTitle} numberOfLines={1}>
        {subTitle}
      </AppText>
      <Image style={styles.image} source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 600,
    padding: 15
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    align: "center",
  },
  title: {
    marginBottom: 7,
    align: "center",
  },
});

export default Card;
