import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  useCollapsible,
  AnimatedSection,
} from "reanimated-collapsible-helpers";

import AppText from "./AppText";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

function InfoCard({
  icon,
  placeholder,
  description,
  selectedItem,
  width = "100%",
}) {
  const { animatedHeight, height, onPress, onLayout, state } = useCollapsible();
  const [colorButton, setColor] = useState(colors.light);
  const [isPressed, setPress] = useState(true);

  graphs = [];

  function onPressPlus() {
    graphs = graphs.concat(placeholder);
    console.log(graphs);
  }

  function chooseColor() {
    setColor(
      isPressed === true ? colors.danger.toString() : colors.light.toString()
    );
  }

  function combine() {
    onPressPlus();
    chooseColor();
    setPress(isPressed === true ? false : true);
  }
  return (
    <View style={[styles.mainContainer, { backgroundColor: colorButton }]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={30}
              color={defaultStyles.colors.secondary}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={defaultStyles.colors.secondary}
          />
        </View>
      </TouchableWithoutFeedback>
      <AnimatedSection
        style={styles.animate}
        animatedHeight={animatedHeight}
        onLayout={onLayout}
        state={state}
      >
        <View style={[styles.textContainer]}>
          <AppText style={styles.text}>{description}</AppText>
          <TouchableWithoutFeedback onPress={() => combine()}>
            <MaterialCommunityIcons
              name="plus-circle"
              size={30}
              color={defaultStyles.colors.secondary}
            />
          </TouchableWithoutFeedback>
        </View>
      </AnimatedSection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    flexDirection: "row",
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.secondary,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  textContainer: {
    padding: 25,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  animate: {
    easing: 10000,
  },
  mainContainer: {
    backgroundColor: defaultStyles.colors.light,
    margin: 10,
    borderRadius: 40,
  },
});

export default InfoCard;
