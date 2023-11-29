import { createEvent, createStore } from "effector";

export const $userName = createStore<string>("");
export const $userLastName = createStore<string>("");
export const $userEmail = createStore<string>("");
export const $userCountry = createStore<string>("");
export const $userPhone = createStore<string>("");
export const $userSelectedSource = createStore<string>("");
export const $userMessanger = createStore<string>("");
export const $userMessangerValue = createStore<string>("");
export const $userPageCategory = createStore<string>("");
export const $userPageName = createStore<string>("");

export const setUserName = createEvent<string>();
export const setUserLastName = createEvent<string>();
export const setUserEmail = createEvent<string>();
export const setUserCountry = createEvent<any>();
export const setUserPhone = createEvent<string>();
export const setUserSelectedSource = createEvent<any>();
export const setUserMessanger = createEvent<any>();
export const setUserMessangerValue = createEvent<any>();
export const setUserPageCategory = createEvent<any>();
export const setUserPageName = createEvent<string>();
