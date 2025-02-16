import {NavLink} from "react-router-dom";

const Menu = () => {

    const router = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/countries",
            title: "Countries"
        },
        {
            path: "/country",
            title: "Country"
        }
    ]

    return <nav>
        <ul>
            {router.map(({path, title}, index) => (
                <li key={index}>
                    <NavLink to={path}>{title}</NavLink>
                </li>
            ))}
        </ul>
    </nav>
}

export default Menu;