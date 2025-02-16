import {useContext, useEffect, useState} from "react";
import CountryContext from "../../contexts/CountryContext.jsx";
import {useParams} from "react-router-dom";
import "./CountryCardComponent.scss"

const CountryCardComponent = () => {
    const [country, setCountry] = useState(null);
    const {countries} = useContext(CountryContext);
    const {name} = useParams();

    useEffect(() => {
        const countryByName = getCountryByName(name);
        console.log("name: " + name)
        console.log("findCountry: " + countryByName)
        setCountry(countryByName)
    }, []);

    const getCountryByName = (name) => {
        if (!name) return null;
        console.log("countries: " + countries)
        return countries.find(it =>
            it.name.official === name
        ) || null;
    };

    const renderJson = (data) => {
        if (typeof data === "object" && data !== null) {
            return (
                <ul>
                    {Object.entries(data).map(([key, value], index) => (
                        <li key={index}>
                            {key}: {renderJson(value)}
                        </li>
                    ))}
                </ul>
            );
        }
        return data;
    };

    return country == null ? null : <div className="country-list">
        <h3>{country.name.common}</h3>
        {renderJson(country)}
    </div>
}
 
export default CountryCardComponent;