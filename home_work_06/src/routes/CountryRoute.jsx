import CountryCardComponent from "../components/countrypage/CountryCardComponent.jsx";
import RedirectButtonComponent from "../components/countrypage/RedirectButtonComponent.jsx";
import "./CountryRoute.scss"

const CountryRoute = () => {
    return <div className={"country-route"}>
        <CountryCardComponent/>
        <RedirectButtonComponent/>
    </div>
}

export default CountryRoute;