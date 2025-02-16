import {useEffect, useState} from "react";
import countriesRepository from "../repository/CountriesRepository.js";
import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout.jsx";
import HomeRoute from "../routes/HomeRoute.jsx";
import CountriesRoute from "../routes/CountriesRoute.jsx";
import CountryRoute from "../routes/CountryRoute.jsx";
import ErrorRoute from "../routes/ErrorRoute.jsx";

const UseCountry = () => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const initCountries = await countriesRepository.getAllCountries();
                setCountries(initCountries);
            } catch (e) {
                console.error(e);
            }
        };

        fetchCountries();
    }, []);

    const removeCountryByName = (name) => {
        console.log("removeCountryByName")
        const filterCountries = countries.filter(
            (country) => country.name.official !== name
        )
        setCountries(filterCountries)
    };

    const getOfficialTranslation = (country, key) => {
        return key == null ? country.name.official : country.translations[key].official;
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <HomeRoute/>
                },
                {
                    path: '/countries',
                    element: <CountriesRoute/>
                },
                {
                    path: '/countries/:name',
                    element: <CountryRoute/>
                }
            ],
            errorElement: <ErrorRoute/>
        },
    ]);

    return {countries, removeCountryByName, getOfficialTranslation, router}
}

export default UseCountry;