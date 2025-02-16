import countriesRepository from "../../repository/CountriesRepository.js";
import {useEffect, useState} from "react";
import "./CountryFormComponent.scss"
import {NavLink} from "react-router-dom";

const CountryFormComponent = () => {
    const [activeCountry, setActiveCountry] = useState(0);
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const initCountries = await countriesRepository.getAllCountries();
            setCountries(initCountries);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCountryChange = (event) => {
        const selectedIndex = event.target.selectedIndex;
        setActiveCountry(selectedIndex);
    };

    return (
        <div className={"country-form-component"}>
            <h2>Capital Form Component</h2>
            {countries == null ? null : (
                <form className={"country-form-component-form"}>
                    <label className={"country-form-component-label"}>
                        Select Capital
                        <select id="capital" name="capital" onChange={handleCountryChange}>
                            {countries.map((it, index) => (
                                <option key={index} value={it.capital[0]}>
                                    {`${it.flag} ${it.capital[0]}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={"country-form-component-label"}>
                        Select Translation
                        <select id="translations" name="translations">
                            {Object.keys(countries[activeCountry].translations).map((it, index) => (
                                <option key={index} value={it}>
                                    {it}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button><NavLink to={"/county"}>Read more about {countries[activeCountry].name.common}</NavLink></button>
                </form>
            )}
        </div>
    );
};

export default CountryFormComponent;
