import {useNavigate} from "react-router-dom";

const RedirectButtonComponent = () => {
    const navigate = useNavigate();
    return <>
        <button onClick={() => navigate("/countries")}>Back to Countries</button>
    </>
}

export default RedirectButtonComponent;