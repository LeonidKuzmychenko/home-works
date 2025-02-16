import axios from "axios";

const API = "https://679286cdcf994cc6804a5368.mockapi.io";

const countriesRepository = {
    getAllCountries: () => axios.get(`${API}/countries`).then(({data}) => data)
}

export default countriesRepository;