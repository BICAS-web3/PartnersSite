import { createEvent, createStore } from "effector";

// variables
export const $isSidebarClosed = createStore<boolean>(false);

// events
export const setClosed = createEvent<boolean>();

// handlers
$isSidebarClosed.on(setClosed, (_, inp) => inp);
