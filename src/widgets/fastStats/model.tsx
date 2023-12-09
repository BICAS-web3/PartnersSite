import { createEvent, createStore } from "effector";

export const $tablePeriod = createStore<number>(24 * 3600 * 1000);

export const setTablePeriod = createEvent<number>();

$tablePeriod.on(setTablePeriod, (_, state) => state);
