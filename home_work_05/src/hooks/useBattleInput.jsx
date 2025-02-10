import {useContext, useRef, useState} from "react";
import BattleContext from "../contexts/BattleContext.jsx";

const useBattleInput = (index) => {
    const [errorText, setErrorText] = useState(null)
    const usernameRef = useRef();
    const {submit} = useContext(BattleContext);

    const handleUsername = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const status = await submit(index, username);
        switch (status) {
            case 200: {
                setErrorText(null);
                break;
            }
            case 404: {
                setErrorText("Username not exist");
                break;
            }
            default: setErrorText("Error")
        }
    };

    return {handleUsername, usernameRef, errorText, setErrorText}
}

export default useBattleInput;