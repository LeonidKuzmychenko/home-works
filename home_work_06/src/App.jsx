import HomeRoute from "./routes/HomeRoute.jsx";
import CountriesRoute from "./routes/CountriesRoute.jsx";
import CountryRoute from "./routes/CountryRoute.jsx";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import ErrorRoute from "./routes/ErrorRoute.jsx";
import Layout from "./pages/Layout.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children:[
                {
                    path: '/',
                    element: <HomeRoute/>
                },
                {
                    path: '/countries',
                    element: <CountriesRoute/>
                },
                {
                    path: '/country',
                    element: <CountryRoute/>
                }
            ],
            errorElement: <ErrorRoute/>
        },
    ]);
    return (
        <RouterProvider router={router}/>
    )
}

export default App
