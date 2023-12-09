import { createEvent, createStore } from "effector";

// variables
export const $isLogin = createStore<boolean>(false);
export const $isSignup = createStore<boolean>(false);
export const $readyUpdate = createStore<boolean>(false);

// events
export const setLogin = createEvent<boolean>();
export const setSignup = createEvent<boolean>();
export const setReadyUpdate = createEvent<boolean>();

// handlers
$isLogin.on(setLogin, (_, inp) => inp);
$isSignup.on(setSignup, (_, inp) => inp);
$readyUpdate.on(setReadyUpdate, (_, state) => state);
