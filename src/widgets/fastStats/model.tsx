import { createEvent, createStore } from "effector";

export const $tablePeriod = createStore<{ timeline: number; period: number }>({
  timeline: 24 * 3600,
  period: 900,
});

export const setTablePeriod = createEvent<{
  timeline: number;
  period: number;
}>();

$tablePeriod.on(setTablePeriod, (_, state) => state);
