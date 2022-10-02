import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import InfoCard from "../components/InfoCard";
import colors from "../config/colors";

const listings = [
  {
    id: 1,
    title: "Precipitation",
    details: "This is stuff about stuff lol",
    fetchdata: "Stuf",
  },
  {
    id: 2,
    title: "Average Pay",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
  {
    id: 3,
    title: "Poverty",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

function ListingsScreen() {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <InfoCard name={item.title} placeholder={item.title} width={"100%"} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.primary,
  },
});

export default ListingsScreen;
