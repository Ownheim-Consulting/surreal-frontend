import { React } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';

import colors from '../config/colors';
import routes from '../navigations/routes';
import useApi from '../hooks/useApi';
import graphsApi from '../apis/graphsApi';


function GraphScreen(props) {
    // Need to process list of graphs to get
    // This list can be kept in local memory
    // let graphsToGet = props.graphsToGet;
    // const getGraphsApi = useApi(graphsApi.getGraphs(graphsToGet));

    // useEffect(() => {
    //     getGraphsApi.request();
    // }, []);

    return (
        <Screen style={styles.screen}>
            <FlatList
                showVerticalScrollIndicator={false}
                // data={getGraphsApi.data}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ graph }) => (
                    <Card
                        title={graph.title}
                        subTitle={graph.subTitle}
                        image={graph.image}
                        onPress={() => return} // TODO (Greg Heiman): Implement zooming and touching on counties
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 20,
        backgroundColor: colors.light,
    },
});

export default GraphScreen;
