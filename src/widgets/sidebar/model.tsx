import { createEvent, createStore } from "effector";

// variables

export const $isSidebarOpened = createStore<boolean>(true);

// events
export const Open = createEvent<void>();
export const Close = createEvent<void>();

// handlers
$isSidebarOpened.on(Open, (_, __) => true).on(Close, (_, __) => false);
