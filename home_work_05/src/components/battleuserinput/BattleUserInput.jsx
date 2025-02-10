import "./BattleUserInput.scss"
import {useContext, useRef} from "react";
import BattleContext from "../../contexts/BattleContext.jsx";

// eslint-disable-next-line react/prop-types
const BattleUserInput = ({index}) => {

    const usernameRef = useRef();
    const {submitUsername} = useContext(BattleContext);

    const handleUsername = (e) => {
        e.preventDefault()
        const username = usernameRef.current.value;
        submitUsername(index, username)
    }

    return <>
        <form className={"battleUserInfoForm"}>
            <p>Choose <b>Player {index+1}</b> username</p>
            <input type={"text"} ref={usernameRef}/>
            <button onClick={handleUsername}>Submit</button>
        </form>
    </>

}

export default BattleUserInput;