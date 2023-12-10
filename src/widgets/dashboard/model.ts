import { createEvent, createStore } from "effector";

export const $periodFirst = createStore<{ timeline: number; period: number }>({
  timeline: 24 * 3600 * 1000,
  period: 3600,
});
export const $periodSecond = createStore<{ timeline: number; period: number }>({
  timeline: 24 * 3600 * 1000,
  period: 3600,
});

export const setPeriodFirst = createEvent<{
  timeline: number;
  period: number;
}>();
export const setPeriodSecond = createEvent<{
  timeline: number;
  period: number;
}>();

$periodFirst.on(setPeriodFirst, (_, state) => state);
$periodSecond.on(setPeriodSecond, (_, state) => state);
