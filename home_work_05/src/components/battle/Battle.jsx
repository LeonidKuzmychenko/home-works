import {useReducer, useState} from "react";
import BattleUser from "../battleuser/BattleUser.jsx";
import BattleUserInput from "../battleuserinput/BattleUserInput.jsx";
import "./Battle.scss"
import gitRepository from "../../repositories/gitRepository.js";
import INITIAL_VALUE from "../../constants/battleConstants.js";

const Battle = () => {

    const [finish, setFinish] = useState(false);

    const actionCreator = (type, payload) => {
        return {type, payload}
    }

    const reducer = (state, action) => {
        if (action.type === "submitUsername") {
            return state.map((user, idx) =>
                idx === action.payload.index
                    ? {
                        ...user,
                        followers: action.payload.followers,
                        avatar_url: action.payload.avatar_url,
                        login: action.payload.login
                    }
                    : user
            );
        }
        if (action.type === "reset") {
            return state.map((user, idx) => (idx === action.payload.index ? null : user));
        }
        if (action.type === "battle") {
            return state.map((user, idx) => {
                    return {
                        ...user,
                        stars: action.payload.stars[idx],
                        total: action.payload.total[idx],
                        winner: action.payload.winner[idx]
                    }
                }
            );
        }
        if (action.type === "restart") {
            return INITIAL_VALUE;
        }
        return state;
    }

    const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

    const battle = async () => {
        try {
            const userRepoInfos = await Promise.all(
                state.map(user => gitRepository.getUserRepoInfo(user.login))
            );

            const stars = userRepoInfos.map(repos =>
                repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
            );

            const totals = state.map((user, index) => user.followers + stars[index]);

            const maxTotal = Math.max(...totals);
            const winner = totals.map(total => total === maxTotal);

            dispatch(actionCreator(
                "battle",
                {stars: stars, total: totals, winner: winner}
            ));

            setFinish(true);
        } catch (e) {
            console.error(e);
        }
    };

    const restart = () => {
        dispatch(actionCreator(
            "restart"
        ));
        setFinish(false)
    }

    const reset = (index) => {
        dispatch(actionCreator(
            "reset",
            {index: index}
        ));
    }

    const submitUsername = async (index, username) => {
        try {
            const userInfo = await gitRepository.getUserInfo(username)
            dispatch(
                actionCreator(
                    "submitUsername",
                    {index: index, ...userInfo}
                ));
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