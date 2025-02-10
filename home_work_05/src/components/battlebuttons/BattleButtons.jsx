import {useContext} from "react";
import BattleContext from "../../contexts/BattleContext.jsx";
import "./BattleButtons.scss"

const BattleButtons = () => {
    const {finish, restart, battle, statesNotNull} = useContext(BattleContext);

    return (statesNotNull() && (
        <div className="battleButtonContainer">
            <button onClick={finish ? restart : battle}>
                {finish ? "Restart 🔄" : "Battle!"}
            </button>
        </div>
    ))
}

export default BattleButtons;