import {useReducer, useState} from "react";
import {INITIAL_VALUE} from "../constants/battleConstants.js";
import gitRepository from "../repositories/gitRepository.js";
import {actionCreator, BATTLE, RESET, RESTART, SUBMIT} from "../services/actions.js";
import {reducer} from "../services/reducer.js";

export default function useBattle() {
    const [finish, setFinish] = useState(false);
    const [states, dispatch] = useReducer(reducer, INITIAL_VALUE);

    const battle = async () => {
        try {
            const userRepoInfos = await Promise.all(states.map(user => gitRepository.getUserRepoInfo(user.login)));

            const results = userRepoInfos.map((repos, index) => ({
                stars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
                total: states[index].followers + repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
            }));

            const maxTotal = Math.max(...results.map(result => result.total));
            const winner = results.map(result => result.total === maxTotal);

            dispatch(actionCreator(BATTLE, {
                stars: results.map(result => result.stars),
                total: results.map(result => result.total),
                winner
            }));

            setFinish(true);
        } catch (e) {
            console.error(e);
        }
    };

    const restart = () => {
        dispatch(actionCreator(RESTART));
        setFinish(false);
    };

    const reset = index => dispatch(actionCreator(RESET, {index}));

    const submit = async (index, username) => {
        try {
            const {followers, avatar_url, login} = await gitRepository.getUserInfo(username);
            dispatch(actionCreator(SUBMIT, {index, followers, avatar_url, login}));
            return 200;
        } catch (e) {
            console.error(e);
            return e.status;
        }
    };

    const statesNotNull = () => {
        return states.every(value => value !== null);
    }

    return {states, submit, reset, battle, restart, finish, statesNotNull};
}