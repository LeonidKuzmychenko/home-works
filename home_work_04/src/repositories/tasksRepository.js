import axios from "axios";

const API = "https://679286cdcf994cc6804a5368.mockapi.io";

const tasksRepository = {
    get: () => axios.get(API + "/tasks").then(({data}) => data),
    post: (item) => axios.post(API + "/tasks", item).then(({data}) => data)
}

export default tasksRepository;

