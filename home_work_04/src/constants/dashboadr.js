export const STATUSES = new Map([
    [0, "To do"],
    [1, "In progress"],
    [2, "Done"],
    [4, "On Hold"],//NOTE: On Hold
]);

export const BUTTONS = new Map([
    [0, [{name: "In progress", to: 1}]],
    [1, [
        {name: "To do", to: 0},
        {name: "On Hold", to: 4}, //NOTE:On Hold
        {name: "Done", to: 2}
    ]],
    [2, [{name: "To archive", to: -1}]],
    [4, [{name: "To do", to: 0}, {name: "In Progress", to: 1}]],//NOTE:On Hold
]);

export const DEFAULT_COLUMNS = new Map([
    [0, []],
    [4, []],//NOTE:On Hold
    [1, []],
    [2, []],
]);