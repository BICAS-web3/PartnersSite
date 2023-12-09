import { createEvent, createStore } from "effector";

export const $isAuthed = createStore(false);

export const setIsAuthed = createEvent<boolean>();

$isAuthed.on(setIsAuthed, (_, state) => state);
