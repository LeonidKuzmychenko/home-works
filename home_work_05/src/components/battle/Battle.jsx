import {useReducer, useState} from "react";
import BattleUser from "../battleuser/BattleUser.jsx";
import BattleUserInput from "../battleuserinput/BattleUserInput.jsx";
import "./Battle.scss"
import gitRepository from "../../repositories/gitRepository.js";
import {INITIAL_VALUE} from "../../constants/battleConstants.js";
import {reducer} from "../reducer.js";
import {actionCreator, BATTLE, RESET, RESTART, SUBMIT_USERNAME} from "../actions.js";

const Battle = () => {

    const [finish, setFinish] = useState(false);
    const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

    const battle = async () => {
        try {
            const userRepoInfos = await Promise.all(
                state.map(user => gitRepository.getUserRepoInfo(user.login))
            );
            const stars = userRepoInfos.map(repos =>
                repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
            );
            const total = state.map((user, index) => user.followers + stars[index]);
            const maxTotal = Math.max(...total);
            const winner = total.map(total => total === maxTotal);
            dispatch(actionCreator(BATTLE, {stars, total, winner}));
            setFinish(true);
        } catch (e) {
            console.error(e);
        }
    };

    const restart = () => {
        dispatch(actionCreator(RESTART));
        setFinish(false)
    }

    const reset = (index) => {
        dispatch(actionCreator(RESET, {index: index}));
    }

    const submitUsername = async (index, username) => {
        try {
            const userInfo = await gitRepository.getUserInfo(username)
            dispatch(actionCreator(SUBMIT_USERNAME, {index: index, ...userInfo}));
        } catch (e) {
            console.log(e);
        }
    }
    return <>
        <div className={"battleContainer"}>
            <h1 className={"battleTitle"}>Let&#39;s Get Ready to Rumble 🥊</h1>
            <div className={"battleUsersContainer"}>
                {
                    state.map((state, id) => {
                        return <>
                            {state == null
                                ? <BattleUserInput index={id} submitUsername={submitUsername}/>
                                : <BattleUser index={id} userInfo={state} reset={reset}/>
                            }
                        </>
                    })
                }
            </div>
            {state.every(value => value !== null) && finish
                ? <div className={"battleRestartButtonContainer"}>
                    <button onClick={restart}>Restart 🔄</button>
                </div>
                : null
            }
            {state.every(value => value !== null) && !finish
                ? <div className={"battleButtonContainer"}>
                    <button onClick={battle}>Battle!</button>
                </div>
                : null
            }
        </div>
    </>
}

export default Battle;