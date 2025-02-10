import {BATTLE, RESET, RESTART, SUBMIT_USERNAME} from "./actions.js";
import {INITIAL_VALUE} from "../constants/battleConstants.js";

export const reducer = (state = INITIAL_VALUE, {type, payload}) => {
    switch (type) {
        case SUBMIT_USERNAME:
            return state.map((user, idx) =>
                idx === payload.index
                    ? {
                        ...user,
                        followers: payload.followers,
                        avatar_url: payload.avatar_url,
                        login: payload.login
                    }
                    : user
            );
        case RESET:
            return state.map((user, idx) => (idx === payload.index ? null : user));
        case BATTLE:
            return state.map((user, idx) => {
                    return {
                        ...user,
                        stars: payload.stars[idx],
                        total: payload.total[idx],
                        winner: payload.winner[idx]
                    }
                }
            );
        case RESTART:
            return INITIAL_VALUE;
        default:
            return state;
    }
}