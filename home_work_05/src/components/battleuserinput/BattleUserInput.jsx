import "./BattleUserInput.scss"
import {useRef} from "react";

// eslint-disable-next-line react/prop-types
const BattleUserInput = ({index, submitUsername}) => {

    const usernameRef = useRef();

    const handleUsername = (e) => {
        e.preventDefault()
        const username = usernameRef.current.value;
        console.log("handleUsername " + username)
        submitUsername(index, username)
    }

    return <>
        <form className={"battleUserInfoForm"}>
            <p>Choose {index} username</p>
            <input type={"text"} ref={usernameRef}/>
            <button onClick={handleUsername}>Submit</button>
        </form>
    </>

}

export default BattleUserInput;