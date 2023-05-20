<script>
    import { getContext, onMount } from "svelte";
	import { key } from "./TabGroup.svelte";

    /** @type {{selectedTab: import("svelte/store").Writable<number>}}*/
    const { selectedTab } = getContext(key);

    /** @type {string} */
    export var name;

    /** @type {HTMLDivElement} */
    var child;

    /** @type {number} */
    var index; 
    onMount(() => {
        index = Array.prototype.indexOf.call(child?.parentNode?.children, child);
    });
</script>

<div bind:this={child} id={name} class:hidden={$selectedTab!=index} class="rounded-md bg-filled-900 text-white h-full py-2">
    <slot/>
</div>

<style>
</style>