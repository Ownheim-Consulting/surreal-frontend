import { SearchBar } from "@rneui/themed";
import React, { ReactElement, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";

import ChartListing from "@app/components/ChartListing";
import ErrorMessage from "@app/components/ErrorMessage";
import LoadingIndicator from "@app/components/LoadingIndicator";
import Screen from "@app/components/Screen";

import { ChartApi } from "@app/apis/ChartApi";

import { Chart as ChartModel } from "@app/models/Chart";
import { ChartSelection } from "@app/models/ChartSelection";

import colors from "@app/config/colors";

interface ListingsScreenProps {
    selectedCharts: Array<ChartSelection>;
    handleChartSelectionChange: (chartSelection: ChartSelection) => void;
}

function ListingsScreen({
    selectedCharts,
    handleChartSelectionChange,
}: ListingsScreenProps): ReactElement {
    const [charts, setCharts] = useState<Array<ChartModel>>([]);
    const [checked, setChecked] = useState<Array<number>>([]);
    const [search, setSearch] = useState<string>("");
    const { isLoading, error, data } = useQuery<Array<ChartModel>, Error>(
        "chartListings",
        ChartApi.getCharts
    );

    // Update the recent charts list with the correct checkbox status
    // even if user checked chart in home screen
    useMemo(() => {
        let newChecked = new Array<number>();
        selectedCharts.forEach((chartSelection) => {
            newChecked.push(chartSelection.id);
        });
        setChecked(newChecked);
    }, [selectedCharts]);

    // Set local state copy of data returned from API.
    // This allows us to filter the data without having to
    // refetch
    useMemo(() => {
        if (data) {
            setCharts(data);
        }
    }, [data]);

    function onCheckboxToggle(id: number): void {
        let cpyChecked = [...checked];
        if (!cpyChecked.includes(id)) {
            cpyChecked.push(id);
        } else {
            cpyChecked = cpyChecked.filter((elementId) => elementId !== id);
        }
        setChecked(cpyChecked);

        let c = new ChartSelection(id, cpyChecked.includes(id));
        handleChartSelectionChange(c);
    }

    // Update search bar text and filter chart list based on user search input
    function updateSearch(searchText: string): void {
        if (data) {
            let newCharts = data.filter((chart) => {
                let chartTitle = chart.title.toUpperCase();
                let search = searchText.toUpperCase();
                return chartTitle.indexOf(search) > -1;
            });

            setCharts(newCharts);
            setSearch(searchText);
        }
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <Screen style={styles.screen}>
            <SearchBar
                placeholder="Search"
                platform={"android"}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInnerContainer}
                onChangeText={updateSearch}
                value={search}
            />
            <FlatList
                data={charts}
                keyExtractor={(chart) => chart.id.toString()}
                renderItem={({ item }) => (
                    <ChartListing
                        chart={item}
                        checkboxValue={checked.includes(item.id)}
                        onCheckboxToggle={onCheckboxToggle}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingTop: 15,
    },
    searchBarContainer: {
        padding: 20,
    },
    searchBarInnerContainer: {
        backgroundColor: colors.lightGray,
        borderRadius: 50,
    },
});

export default ListingsScreen;
