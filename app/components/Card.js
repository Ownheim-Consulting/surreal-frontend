import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import InsetShadow from "react-native-inset-shadow";
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
      <View style={styles.imageView}>
        <InsetShadow style={styles.shadow}>
          <ScrollView minimumZoomScale={1} maximumZoomScale={5}>
            <Image style={styles.image} source={image} />
          </ScrollView>
        </InsetShadow>
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
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "Center",
    flex: 1,
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
    height: 200,
  },
  shadow: {},
});

export default Card;
