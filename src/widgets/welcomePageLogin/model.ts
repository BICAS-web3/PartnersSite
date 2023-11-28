import { createEvent, createStore } from "effector";

export const $loginStore = createStore<string>("");
export const $timestamp = createStore<number>(0);

export const setLoginStore = createEvent<string>();
export const setTimestamp = createEvent<number>();

$timestamp.on(setTimestamp, (_, state) => state);
$loginStore.on(setLoginStore, (_, state) => state);
