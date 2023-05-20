import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const currentSection = writable("");

/**
 * 
 * @param {string} name 
 */
export function setSection(name) {
    currentSection.set(name);
    if (browser) {
        window.history.pushState({}, document.title, name);
    }
}