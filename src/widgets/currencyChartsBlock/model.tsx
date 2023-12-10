import { createEvent, createStore } from "effector";

export const $periodType = createStore<any>("daily");

export const setPeriodType = createEvent<any>();

$periodType.on(setPeriodType, (_, state) => state);
