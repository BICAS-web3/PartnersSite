import { createEvent, createStore } from "effector";

export const $userName = createStore<string>("");
export const $userLastName = createStore<string>("");
export const $userEmail = createStore<string>("");
export const $userLanguage = createStore<string>("");
export const $userCountry = createStore<string>("");
export const $userPhone = createStore<string>("");
export const $userSelectedSource = createStore<string>("");
export const $userMessanger = createStore<string>("");
export const $userMessangerValue = createStore<string>("");
export const $userPageCategory = createStore<string>("");
export const $userPageName = createStore<string>("");
export const $signature = createStore<string>("");
export const $timestamp = createStore<number>(0);
export const $callContactReg = createStore<boolean>(false);

export const setUserName = createEvent<string>();
export const setUserLastName = createEvent<string>();
export const setUserEmail = createEvent<string>();
export const setUserLanguage = createEvent<string>();
export const setUserCountry = createEvent<any>();
export const setUserPhone = createEvent<string>();
export const setUserSelectedSource = createEvent<any>();
export const setUserMessanger = createEvent<any>();
export const setUserMessangerValue = createEvent<any>();
export const setUserPageCategory = createEvent<any>();
export const setUserPageName = createEvent<string>();
export const setSignature = createEvent<string>();
export const setTimestamp = createEvent<number>();
export const setCallContactReg = createEvent<boolean>();

$userName.on(setUserName, (_, state) => state);
$userLastName.on(setUserLastName, (_, state) => state);
$userEmail.on(setUserEmail, (_, state) => state);
$userLanguage.on(setUserLanguage, (_, state) => state);
$userCountry.on(setUserCountry, (_, state) => state);
$userPhone.on(setUserPhone, (_, state) => state);
$userSelectedSource.on(setUserSelectedSource, (_, state) => state);
$userMessanger.on(setUserMessanger, (_, state) => state);
$userMessangerValue.on(setUserMessangerValue, (_, state) => state);
$userPageCategory.on(setUserPageCategory, (_, state) => state);
$userPageName.on(setUserPageName, (_, state) => state);
$signature.on(setSignature, (_, state) => state);
$timestamp.on(setTimestamp, (_, state) => state);
$callContactReg.on(setCallContactReg, (_, state) => state);