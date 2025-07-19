import { writable } from "svelte/store";
import { scrollLocker } from "../utils/other";

export const popUpsQuantity = writable(0);

popUpsQuantity.subscribe(current => scrollLocker(current > 0));