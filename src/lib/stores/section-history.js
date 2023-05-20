import { browser } from "$app/environment";
import { get, writable } from "svelte/store";
import { setSection } from "./current-section";
import { scrollIntoView } from "$lib/functions";

/**
 * @type {import("svelte/store").Writable<string[]>}
 */
export const sectionHistory = writable([]);
export const sectionHistoryIdx = writable(0);

/**
 * Push a section into the history of sections.
 * @param {string} href 
 */
export function pushSection(href) {
    if(!href.startsWith("#")) {
        const hrefSplit = href.split("#");
        href = `#${hrefSplit[hrefSplit.length-1]}`;
    }
    sectionHistory.set([...get(sectionHistory).slice(0, get(sectionHistoryIdx)+1), href]);
    sectionHistoryIdx.set(get(sectionHistory).length-1);
}

/**
 * Scroll to the next section (if one exists) 
 */
export function nextSection() {
    sectionHistoryIdx.set(Math.min(get(sectionHistoryIdx) + 1, get(sectionHistory).length-1));
    const href = get(sectionHistory)[get(sectionHistoryIdx)];
    setSection(href);
    scrollIntoView(href);
}

/**
 * Scroll to the last section (if one exists)
 */
export function previousSection() {
    sectionHistoryIdx.set(Math.max(get(sectionHistoryIdx) - 1, 0));
    const href = get(sectionHistory)[get(sectionHistoryIdx)];
    setSection(href);
    scrollIntoView(href);
}

/**
 * Check if there are any future sections stored.
 * @returns {boolean}
 */
export function hasFuture() {
    return get(sectionHistoryIdx) < get(sectionHistory).length-1;
}

/**
 * Check if there are any past sections stored.
 * @returns {boolean}
 */
export function hasHistory() {
    return get(sectionHistoryIdx) > 0;
}

/**
 * @param {string} href
 * @returns {boolean}
 */
export function isLastSection(href) {
    if (!href.startsWith("#")) {
        const hrefSplit = href.split("#");
        href = `#${hrefSplit[hrefSplit.length - 1]}`;
    }
    return get(sectionHistory)[get(sectionHistory).length-1] == href;
}