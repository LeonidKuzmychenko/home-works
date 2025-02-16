import {useContext, useRef, useState} from "react";
import "./CountryFormComponent.scss";
import {useNavigate} from "react-router-dom";
import CountryContext from "../../contexts/CountryContext.jsx";

const CountryFormComponent = () => {
    const [activeCountry, setActiveCountry] = useState(0);
    const translationRef = useRef(null);
    const {countries} = useContext(CountryContext);

    const navigate = useNavigate();

    const handleCountryChange = (event) => {
        setActiveCountry(event.target.selectedIndex);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const countryName = countries[activeCountry].name.official;
        const translation = translationRef.current.value;
        navigate(`/countries/${countryName}?translation=${translation}`)
    };

    return (
        <div className="country-form-component">
            <h2>Capital Form Component</h2>
            {countries.length == null ? null :
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
                        <select id="translations" name="translations" ref={translationRef}>
                            {Object.keys(countries[activeCountry]?.translations || {}).map((it, index) => (
                                <option key={index} value={it}>
                                    {it}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Read more about {countries[activeCountry]?.name.common}</button>
                </form>
            }
        </div>
    );
};

export default CountryFormComponent;
