import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Button,
    FlatList,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import PickerItem from "./PickerItem";
import Screen from "./Screen";

function AppPicker({
    icon,
    items,
    onSelectItem,
    placeholder,
    selectedItem,
    width = "100%",
}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width: width }]}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                        />
                    )}
                    {selectedItem ? (
                        <AppText style={styles.text}>
                            {selectedItem.label}
                        </AppText>
                    ) : (
                        <AppText style={styles.placeholder}>
                            {placeholder}
                        </AppText>
                    )}

                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={defaultStyles.colors.medium}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                    />
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <PickerItem
                                label={item.label}
                                onPress={() => {
                                    setModalVisible(false);
                                    onSelectItem(item);
                                }}
                            />
                        )}
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.primary,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    placeholder: {
        color: defaultStyles.colors.light,
        flex: 1,
    },
    text: {
        flex: 1,
        backgroundColor: colors.danger,
    },
});

export default AppPicker;
