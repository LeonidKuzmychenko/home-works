export const STATUSES = new Map([
    [0, "To do"],
    [1, "In progress"],
    [2, "Done"]
]);

export const BUTTONS = new Map([
    [0, [{name: "In progress", to: 1}]],
    [1, [{name: "To do", to: 0}, {name: "Done", to: 2}]],
    [2, [{name: "To archive", to: -1}]]
]);

export const DEFAULT_COLUMNS = new Map([
    [0, []],
    [1, []],
    [2, []]
]);