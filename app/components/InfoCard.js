import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useCollapsible,
  AnimatedSection,
} from "reanimated-collapsible-helpers";

import AppText from "./AppText";
import defaultStyles from "../config/styles";

function InfoCard({
  icon,
  placeholder,
  description,
  selectedItem,
  width = "100%",
}) {
  const { animatedHeight, height, onPress, onLayout, state } = useCollapsible();

  return (
    <View style={styles.mainContainer}>
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
          <MaterialCommunityIcons
            name="plus"
            size={30}
            color={defaultStyles.colors.secondary}
          />
        </View>
      </AnimatedSection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
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
    padding: 10,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
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
