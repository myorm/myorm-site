import { setSection } from "./stores/current-section";
import { isLastSection, pushSection } from "./stores/section-history";

/**
 * 
 * @param {string|MouseEvent} o 
 */
export function scrollIntoView(o) {
    let href;
    if(typeof o === "object" && "currentTarget" in o) {{
        //@ts-ignore
        href = o.currentTarget?.getAttribute('href') ?? "";
    }} else {
        href = o;
    }
    if(!isLastSection(window.location.href)) {
        pushSection(window.location.href);
    }
    //@ts-ignore
    const el = document.querySelector(href);
    setSection(href);
    pushSection(href);
    if (!el) return;
    el.scrollIntoView({
        behavior: 'smooth'
    });
}