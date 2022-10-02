import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import AppText from "./AppText";
import colors from "../config/colors";
import AppPicker from "../components/AppPicker";
import counties from "../config/counties";

function Card({ title, subTitle, image, avg, corr }) {
  const [selected, setSelectedItem] = useState();

  function selectedItem() {}
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
      <View>
        <AppPicker
          items={""}
          name="Select County"
          icon="earth"
          placeholder="Select County:"
          width="100%"
        />
        <AppText>Average Value: {avg}</AppText>
        <AppText>Temperature is Correlated: {corr}</AppText>
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
    height: 250,
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
    padding: 10,
    height: 250,
  },
  shadow: {},
});

export default Card;
