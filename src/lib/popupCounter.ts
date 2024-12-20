import { writable } from "svelte/store";
import { scrollLocker } from "./utils";

export const popUpsQuantity = writable(0);

popUpsQuantity.subscribe(current => scrollLocker(current > 0));