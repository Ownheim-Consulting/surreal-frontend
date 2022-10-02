import client from './client';


const getGraph = (endpoint) => client.get(endpoint);

const getGraphs = (graphsToGetUrls) => {
    let graphs = [];
    graphsToGetUrls.forEach((url, index) => {
        graphs.push(client.get(url));
    });
    return graphs;
};

export default {
    getGraph,
    getGraphs,
};
