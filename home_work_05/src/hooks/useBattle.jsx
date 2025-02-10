import {useReducer, useState} from "react";
import {INITIAL_VALUE} from "../constants/battleConstants.js";
import gitRepository from "../repositories/gitRepository.js";
import {actionCreator, BATTLE, RESET, RESTART, SUBMIT_USERNAME} from "../services/actions.js";
import {reducer} from "../services/reducer.js";

export default function useBattle() {
    const [finish, setFinish] = useState(false);
    const [states, dispatch] = useReducer(reducer, INITIAL_VALUE);

    const battle = async () => {
        try {
            const userRepoInfos = await Promise.all(
                states.map(user => gitRepository.getUserRepoInfo(user.login))
            );
            const stars = userRepoInfos.map(repos =>
                repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
            );
            const total = states.map((user, index) => user.followers + stars[index]);
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
    return {states, submitUsername, reset, battle, restart, finish}
}