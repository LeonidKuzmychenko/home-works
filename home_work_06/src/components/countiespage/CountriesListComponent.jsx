import {useContext} from "react";
import CountryContext from "../../contexts/CountryContext.jsx";
import "./CountriesListComponent.scss"
import {NavLink} from "react-router-dom";

const CountriesListComponent = () => {
    const {countries, removeCountryByName} = useContext(CountryContext);

    return <div className={"countries-list-component"}>
        <h3>Counties List</h3>
        <ul className={"countries-list-component-list"}>
            {countries.map((country, index) => (
                <div key={index} className={"countries-list-component-item"}>
                    <li><NavLink to={`/countries/${country.name.official}`}>{country.flag} {country.name.official}</NavLink></li>
                    <button onClick={()=>removeCountryByName(country.name.official)}>Delete</button>
                </div>
            ))}
        </ul>
    </div>
}

export default CountriesListComponent;