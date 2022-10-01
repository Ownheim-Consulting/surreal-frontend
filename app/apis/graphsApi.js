import client from './client';

const endpoint = '/graphs';

const getGraphs = () => client.get(endpoint);

export default {
    getGraphs,
};
