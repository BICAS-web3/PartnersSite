import { createEvent, createStore } from "effector";

export const $periodFirst = createStore<number>(24 * 3600 * 1000);
export const $periodSecond = createStore<number>(24 * 3600 * 1000);

export const setPeriodFirst = createEvent<number>();
export const setPeriodSecond = createEvent<number>();

$periodFirst.on(setPeriodFirst, (_, state) => state);
$periodSecond.on(setPeriodSecond, (_, state) => state);
