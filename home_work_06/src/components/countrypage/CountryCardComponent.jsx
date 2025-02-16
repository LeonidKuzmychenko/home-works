import {useContext, useEffect, useState} from "react";
import CountryContext from "../../contexts/CountryContext.jsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import "./CountryCardComponent.scss"

const CountryCardComponent = () => {
    const [country, setCountry] = useState(null);
    const {countries, removeCountryByName, getOfficialTranslation} = useContext(CountryContext);
    const [searchParams] = useSearchParams()
    const {name} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const countryByName = getCountryByName(name);
        setCountry(countryByName)
    }, []);

    const getCountryByName = (name) => {
        return countries.find(it =>
            it.name.official === name
        ) || null;
    };

    const handleDelete = () => {
        removeCountryByName(name);
        navigate("/countries")
    }

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

    return <div className="country-list-container">
        {country == null ? null : <div className="country-list">
            <h3>{getOfficialTranslation(country, searchParams.get("translation"))}</h3>
            {renderJson(country)}
            <button onClick={() => handleDelete()}>Delete</button>
        </div>}
    </div>

}

export default CountryCardComponent;