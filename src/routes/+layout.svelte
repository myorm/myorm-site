<script context="module">
    import { writable } from "svelte/store";

    export let appShellScrollY = writable(0);
</script>

<script>
	import MyORMSidebarRight from '$lib/components/sidebars/MyORMSidebarRight.svelte';
	import MyORMSidebarLeft from '$lib/components/sidebars/MyORMSidebarLeft.svelte';
    import { autoModeWatcher, modeCurrent, LightSwitch } from '@skeletonlabs/skeleton';
    import { AppBar, AppShell } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import '../app.postcss';

    const allowedLeftSidebarPages = [
        "/docs"
    ];

    /**
     * @param {Event} e
     */
    function handleScroll(e) {
        // @ts-ignore
        $appShellScrollY = e.currentTarget.scrollTop;
    }

    $: slotSidebarLeft = $page.url.pathname.startsWith("/docs") ? `sm:w-0 md:w-60 sticky overflow-y-scroll min-h-full variant-filled-secondary` : "w-0"
    $: slotSidebarRight = $page.url.pathname.startsWith("/docs/reference") ? `sm:w-0 md:w-72 sticky overflow-y-scroll min-h-full variant-filled-secondary` : "w-0"
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

<AppShell on:scroll={handleScroll} 
    {slotSidebarRight}
    {slotSidebarLeft}>
    <svelte:fragment slot="header">
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead">
                <a href="/">
                    <img alt="myorm" src="{$modeCurrent ? "/myorm-logo-text.svg" : "/myorm-logo-text-black-white.svg"}" width=148 height=148>
                </a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a href="/docs">
                    Documentation
                </a>
                <a href="https://www.github.com/@myorm/myorm">
                    <img alt="github" src="{$modeCurrent ? "/github-mark.png" : "/github-mark-white.svg"}" width=32 height=32>
                </a>
                <LightSwitch/>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
        <MyORMSidebarLeft/>
    </svelte:fragment>
    <svelte:fragment slot="sidebarRight">
        <MyORMSidebarRight/>
    </svelte:fragment>
    <slot />

	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>

<style>
</style>
