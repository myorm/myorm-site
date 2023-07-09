<script context="module">
    export const key = Symbol();
</script>

<script>
	import { SvelteComponentTyped, createEventDispatcher, getContext, onMount, setContext } from 'svelte';
	import { get, writable } from 'svelte/store';
    import { Tab } from '.';
    import { browser } from '$app/environment';

    /** @type {import('svelte').ComponentType?}*/
    export var staticComponent = null;
    
    /** @type {import('svelte/store').Writable<number>} */
	let selectedTab = writable(0);
    
    /** @type {import('svelte/store').Writable<any[]>} */
    let staticProps = writable([]);

    let context = {
        selectedTab,
        staticProps
    };
    setContext(key, context);

	const dispatch = createEventDispatcher();

    onMount(() => {
        select(0);
    });

    /**
     * @param {number} n
     */
	function select(n) {
		$selectedTab = n;
        dispatch('select', {
            selectedTab: $selectedTab,
            staticProps: get(context.staticProps)[$selectedTab]
        });
	}

    /** @type {HTMLDivElement} */
	let slotDiv;
	$: totalElements = slotDiv?.children ?? [];
    $: console.log({n: totalElements.length});
</script>

<div class="text-sm font-medium text-center variant-filled-tertiary px-2 rounded-md">
    <ul class="flex flex-wrap -mb-px">
        {#each totalElements as el, n (el.id)}
            <li class="mr-2" 
                class:bg-primary-900={$selectedTab == n} 
                class:bg-primary-400={$selectedTab != n} 
                on:click={() => select(n)} on:keypress={() => {}}>
                <a href="" class:text-primary-50={$selectedTab == n} class="inline-block p-3 hover:text-primary-600 hover:bg-primary-50">{el.id}</a>
            </li>
        {/each}
    </ul>
</div>

<div bind:this={slotDiv} class="text-primary-900 bg-primary-400 dark:bg-primary-900 dark:text-primary-300 px-2 h-full">
    {#if browser && staticComponent && $staticProps.length > 0}
        <svelte:component this={staticComponent} {...$staticProps[$selectedTab]}/>
    {/if}
    <slot />
</div>

<style>
</style>