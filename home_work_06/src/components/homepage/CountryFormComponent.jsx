import {useContext, useEffect, useState} from "react";
import "./CountryFormComponent.scss";
import {useNavigate} from "react-router-dom";
import CountryContext from "../../contexts/CountryContext.jsx";

const CountryFormComponent = () => {
    const [activeCountry, setActiveCountry] = useState(0);
    const [translation, setTranslation] = useState(null);
    const {countries, getOfficialTranslation} = useContext(CountryContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (countries.length > 0) {
            const firstTranslation = Object.keys(countries[0]?.translations || {})[0] || null;
            setTranslation(firstTranslation);
        }
    }, [countries]);

    const handleCountryChange = (event) => {
        setActiveCountry(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const countryName = countries[activeCountry].name.official;
        navigate(`/countries/${countryName}?translation=${translation}`)
    };

    const handleTranslation = (event) =>{
        setTranslation(event.target.value);
    }

    return (
        <div className="country-form-component">
            <h2>Capital Form Component</h2>
            {countries == null || countries.length === 0 ? null :
                <form className="country-form-component-form" onSubmit={handleSubmit}>
                    <label className="country-form-component-label">
                        Select Capital
                        <select id="capital" name="capital" onChange={handleCountryChange}>
                            {countries.map((it, index) => (
                                <option key={index} value={it.capital[0]}>
                                    {`${it.flag} ${it.capital[0]}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="country-form-component-label">
                        Select Translation
                        <select id="translations" name="translations" onChange={handleTranslation}>
                            {Object.keys(countries[activeCountry]?.translations || {}).map((it, index) => (
                                <option key={index} value={it}>
                                    {it}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Read more about {getOfficialTranslation(countries[activeCountry], translation)}</button>
                </form>
            }
        </div>
    );
};

export default CountryFormComponent;
