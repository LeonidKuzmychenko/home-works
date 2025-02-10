import BattleUser from "../battleuser/BattleUser.jsx";
import BattleUserInput from "../battleuserinput/BattleUserInput.jsx";
import "./Battle.scss"
import useBattle from "../../hooks/useBattle.jsx";
import BattleContext from "../../contexts/BattleContext.jsx";
import BattleButtons from "../battlebuttons/BattleButtons.jsx";

const Battle = () => {
    const {states, submit, reset, battle, restart, finish, statesNotNull} = useBattle();

    return <BattleContext.Provider value={{submit, reset, battle, restart, finish, statesNotNull}}>
        <div className={"battleContainer"}>
            <h1 className={"battleTitle"}>Let&#39;s Get Ready to Rumble 🥊</h1>
            <div className={"battleUsersContainer"}>
                {states.map((state, id) => {
                    return <div key={id}>
                        {state == null
                            ? <BattleUserInput index={id}/>
                            : <BattleUser index={id} userInfo={state}/>
                        }
                    </div>
                })}
            </div>
            <BattleButtons/>
        </div>
    </BattleContext.Provider>
}

export default Battle;