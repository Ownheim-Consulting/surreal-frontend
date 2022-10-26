import React from "react";
import { FlatList, StyleSheet, ImageBackground, View } from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import InfoCard from "../components/InfoCard";
import colors from "../config/colors";
import listings from "../config/listing";

function ListingsScreen() {
  return (
    <Screen style={styles.screen}>
      <ImageBackground
        styles={styles.background}
        source={require("../assets/background.png")}
        style={styles.image}
      >
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <InfoCard
              name={item.title}
              description={item.details}
              placeholder={item.title}
              width={"100%"}
            />
          )}
        />
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
  },
  image: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default ListingsScreen;
