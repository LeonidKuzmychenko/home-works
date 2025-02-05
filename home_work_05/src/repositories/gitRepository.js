import axios from "axios";

const API = "https://api.github.com/users";

const gitRepository = {
    getUserInfo: (username) => axios.get(`${API}/${username}`).then(({data}) => data),
    getUserRepoInfo: (username) => axios.get(`${API}/${username}/repos`, { params: { per_page: 100 } }).then(({data}) => data)
}

export default gitRepository;

