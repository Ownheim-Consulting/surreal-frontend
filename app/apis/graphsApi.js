import client from "./client";

const endpoint = "/api/google-cloud/filename/1.jpg";
const getGraph = () => client.get(endpoint);

export default {
  getGraph,
};
