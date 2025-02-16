import {RouterProvider} from "react-router-dom";

import CountryContext from "./contexts/CountryContext.jsx";
import useCountry from "./hooks/useCountry.jsx";

function App() {
    const {countries, removeCountryByName, getOfficialTranslation, router} = useCountry();

    return (
        <CountryContext.Provider value={{countries, removeCountryByName, getOfficialTranslation}}>
            <RouterProvider router={router}/>
        </CountryContext.Provider>
    )
}

export default App
