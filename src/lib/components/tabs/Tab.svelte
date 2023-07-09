<script>
    import { SvelteComponent, getContext, onMount, setContext } from "svelte";
	import { key } from "./TabGroup.svelte";

    /** @type {{selectedTab: import("svelte/store").Writable<number>, staticComponent: import("svelte").ComponentType, staticProps: import('svelte/store').Writable<any[]>}}*/
    const { selectedTab, staticProps: _staticProps } = getContext(key);
        
    /** @type {string} */
    export var name;

    /** @type {any} */
    export var staticProps = {};
    


    /** @type {HTMLDivElement} */
    var child;

    /** @type {number} */
    var index; 
    onMount(() => {
        $_staticProps.push(staticProps);
        index = Array.prototype.indexOf.call(child?.parentNode?.children, child);
        console.log({$_staticProps});
    });
</script>

<div bind:this={child} id={name} class:hidden={$selectedTab!=index} class="rounded-md bg-filled-900 text-white h-full py-2">
    <slot/>
</div>

<style>
</style>