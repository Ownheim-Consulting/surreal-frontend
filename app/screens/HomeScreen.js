import React from "react";
import { Image, StyleSheet, ImageBackground } from "react-native";
import Screen from "../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

function HomeScreen(props) {
  return (
    <Screen>
      <LinearGradient
        colors={["#597ba8", colors.primary]}
        style={styles.linearGradient}
      >
        <ImageBackground
          styles={styles.background}
          source={require("../assets/background.png")}
          style={styles.image}
        >
          <Image
            style={styles.logo}
            source={require("../assets/surreal.png")}
          />
        </ImageBackground>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    margin: 50,
  },
  image: {
    backgroundColor: "transparent",
    alignContent: "center",
  },
  linearGradient: {},
});

export default HomeScreen;
