<script context="module">
    export const key = Symbol();
</script>

<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

    /** @type {import('svelte/store').Writable<number>} */
	var selectedTab = writable(0);

    setContext(key, {
        selectedTab
    });

	const dispatch = createEventDispatcher();

    /**
     * @param {number} n
     */
	function select(n) {
		$selectedTab = n;
        dispatch('select');
	}

    /** @type {HTMLDivElement} */
	let slotDiv;
	$: totalElements = slotDiv?.children ?? [];
</script>

<div class="text-sm font-medium text-center variant-filled-tertiary px-2 rounded-md">
    <ul class="flex flex-wrap -mb-px">
        {#each totalElements as el, n (el.id)}
            <li class="mr-2" 
                class:bg-primary-900={$selectedTab == n} 
                class:bg-primary-400={$selectedTab != n} 
                on:click={() => select(n)} on:keypress={() => {}}>
                <a href="#" class:text-primary-50={$selectedTab == n} class="inline-block p-3 hover:text-primary-600 hover:bg-primary-50">{el.id}</a>
            </li>
        {/each}
    </ul>
</div>

<div bind:this={slotDiv} class="text-primary-900 bg-primary-400 dark:bg-primary-900 dark:text-primary-300 px-2 h-full">
    <slot />
</div>

<style>
</style>