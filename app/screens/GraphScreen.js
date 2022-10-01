import { React } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';

import colors from '../config/colors';
import routes from '../navigations/routes';
import useApi from '../hooks/useApi';
import graphsApi from '../apis/graphsApi';


function GraphScreen(props) {
    const getGraphsApi = useApi(graphsApi.getGraphs);

    useEffect(() => {
        getGraphsApi.request();
    }, []);

    return (
        <Screen style={styles.screen}>
            <FlatList
                showVerticalScrollIndicator={false}
                data={getGraphsApi.data}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ graph }) => (
                    <Card
                        title={graph.title}
                        imageUrl={graph.images[0].url}
                        onPress={() => navigation.navigate(routes.GRAPH_DETAILS_SCREEN, graph)}
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
