import HomeRoute from "./routes/HomeRoute.jsx";
import CountriesRoute from "./routes/CountriesRoute.jsx";
import CountryRoute from "./routes/CountryRoute.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorRoute from "./routes/ErrorRoute.jsx";
import Layout from "./pages/Layout.jsx";
import {useEffect, useState} from "react";
import countriesRepository from "./repository/CountriesRepository.js";
import CountryContext from "./contexts/CountryContext.jsx";

function App() {

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
    return (
        <CountryContext.Provider value={{countries, removeCountryByName}}>
            <RouterProvider router={router}/>
        </CountryContext.Provider>
    )
}

export default App
