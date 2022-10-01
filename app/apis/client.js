import { create } from 'apisauce';

const client = create({
    baseUrl: "http://localhost:8080/api"
});

export default client;
