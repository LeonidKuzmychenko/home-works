import {BATTLE, RESET, RESTART, SUBMIT_USERNAME} from "./actions.js";
import {INITIAL_VALUE} from "../constants/battleConstants.js";

export const reducer = (state = INITIAL_VALUE, { type, payload }) => {
    const actions = new Map([
        [SUBMIT_USERNAME, () =>
            state.map((user, idx) =>
                idx === payload.index ? { ...user, ...payload } : user
            )
        ],
        [RESET, () => state.map((user, idx) => (idx === payload.index ? null : user))],
        [BATTLE, () =>
            state.map((user, idx) => ({
                ...user,
                ...Object.fromEntries(["stars", "total", "winner"].map(key => [key, payload[key][idx]]))
            }))
        ],
        [RESTART, () => INITIAL_VALUE]
    ]);
    return actions.get(type)?.() ?? state;
};