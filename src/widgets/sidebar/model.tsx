import { createEvent, createStore } from "effector";

// variables
export const $isSidebarOpened = createStore<boolean>(false);

// events
export const Open = createEvent<void>();
export const Close = createEvent<void>();

// handlers
$isSidebarOpened.on(Open, (_, __) => true);
$isSidebarOpened.on(Close, (_, __) => false);
