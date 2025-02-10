import BattleUser from "../battleuser/BattleUser.jsx";
import BattleUserInput from "../battleuserinput/BattleUserInput.jsx";
import "./Battle.scss"
import useBattle from "../../hooks/useBattle.jsx";

const Battle = () => {
    const {states, submitUsername, reset, battle, restart, finish} = useBattle();

    return <>
        <div className={"battleContainer"}>
            <h1 className={"battleTitle"}>Let&#39;s Get Ready to Rumble 🥊</h1>
            <div className={"battleUsersContainer"}>
                {states.map((state, id) => {
                    return <div key={id}>
                        {state == null
                            ? <BattleUserInput index={id} submitUsername={submitUsername}/>
                            : <BattleUser index={id} userInfo={state} reset={reset}/>
                        }
                    </div>
                })}
            </div>
            {states.every(value => value !== null) && (
                <div className="battleButtonContainer">
                    <button onClick={finish ? restart : battle}>
                        {finish ? "Restart 🔄" : "Battle!"}
                    </button>
                </div>
            )}
        </div>
    </>
}

export default Battle;