import {useReducer, useState} from "react";
import BattleUser from "../battleuser/BattleUser.jsx";
import BattleUserInput from "../battleuserinput/BattleUserInput.jsx";
import "./Battle.scss"
import gitRepository from "../../repositories/gitRepository.js";

const Battle = () => {

    const [finish, setFinish] = useState(false);

    const reducer = (state, action) => {
        console.log("reducer")
        console.log(`state ${state}`)
        console.log(action)
        if (action.type === "submitUsername") {
            console.log("submitUsername")
            return state.map((user, idx) =>
                idx === action.index
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
            return state.map((user, idx) => (idx === action.index ? null : user));
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
            return [null, null];
        }
        return state;
    }

    const [state, dispatch] = useReducer(reducer, [null, null]);

    const battle = async () => {
        console.log("battle!");
        try {
            const userRepoInfo1 = await gitRepository.getUserRepoInfo(state[0].login);
            const userRepoInfo2 = await gitRepository.getUserRepoInfo(state[1].login);

            const stars1 = userRepoInfo1.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
            const stars2 = userRepoInfo2.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

            const total1 = state[0].followers + stars1;
            const total2 = state[1].followers + stars2;

            const isWinner1 = total1 > total2;
            const isWinner2 = total2 > total1;

            dispatch({
                type: "battle",
                payload: {
                    stars: [stars1, stars2],
                    total: [total1, total2],
                    winner: [isWinner1, isWinner2]
                },
            });
            setFinish(true)
        } catch (error) {
            console.error("Ошибка при загрузке данных репозиториев:", error);
        }
    };

    const restart = () => {
        dispatch({type: "restart"});
        setFinish(false)
    }

    const reset = (index) => {
        dispatch({type: "reset", index: index})
    }

    const submitUsername = async (index, username) => {
        try {
            const userInfo = await gitRepository.getUserInfo(username)
            dispatch({
                type: "submitUsername",
                index,
                payload: userInfo,
            });
        } catch (e) {
            console.log(e);
        }

    }

    return <>
        <div className={"battleContainer"}>
            <div className={"battleUsersContainer"}>
                {state[0] == null
                    ? <BattleUserInput index={0} submitUsername={submitUsername}/>
                    : <BattleUser
                        index={0}
                        userInfo={state[0]}
                        reset={reset}
                    />
                }
                {state[1] == null
                    ? <BattleUserInput index={1} submitUsername={submitUsername}/>
                    : <BattleUser
                        index={1}
                        userInfo={state[1]}
                        reset={reset}
                    />
                }
            </div>
            {state[0] != null && state[1] != null && finish
                ? <div className={"battleRestartButtonContainer"}>
                    <button onClick={restart}>Restart 🔄</button>
                </div>
                : null
            }
            {state[0] != null && state[1] != null && !finish
                ? <div className={"battleButtonContainer"}>
                    <button onClick={battle}>Battle!</button>
                </div>
                : null
            }

        </div>
    </>
}

export default Battle;