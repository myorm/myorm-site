<script>
    import { page } from "$app/stores";
    import { Accordion, AccordionItem, modeCurrent } from "@skeletonlabs/skeleton";
    
    $: currentSection = $page.url.href.split("#")[1];
    $: currentPage = $page.url.pathname;

    /** @type {any} */
    const accordionItemOpenStates = {
        myorm: true,
        adapters: true,
        extensions: true,
        tutorials: true,
        examples: true
    };

    let scrollY = 0;

    function handleClickToggleOpen() {
        const open = !(Object.values(accordionItemOpenStates).filter(v => v).length > 0);
        for(const key in accordionItemOpenStates) {
            accordionItemOpenStates[key] = open;
        }
    }

    $: {
        console.log(scrollY);
    }
</script>

<svelte:window bind:scrollY></svelte:window>
<Accordion>
    <div class="float-right sticky top-0 variant-filled-secondary w-full pt-2">
        <button class="{Object.values(accordionItemOpenStates).filter(v => v).length > 0 ? "rotate" : ""} btn p-1" on:click={handleClickToggleOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
    </div>
    <AccordionItem bind:open={accordionItemOpenStates.myorm}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1" class:bg-secondary-400={currentPage == "/docs"}>MyORM</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "overview"}><a href="/docs#overview">Overview</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentPage == "/docs/reference"}><a href="/docs/reference">Reference</a></li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.adapters}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1" class:bg-secondary-400={currentPage == "/docs/adapters"}>Adapters</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "where"}><a href="/docs/adapters#mysql">MySQL Adapter</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "limit"}><a href="/docs/adapters#mssql">MSSQL Adapter</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "offset"}><a href="/docs/adapters#postgres">POSTGres Adapter</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "group-by"}><a href="/docs/adapters#jsobjects">JS Object Adapter</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "order-by"}><a href="/docs/adapters#mongodb">MongoDB Adapter</a></li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.extensions}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1" class:bg-secondary-400={currentPage == "/docs/extensions"}>Extensions</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "where"}><a href="/extensions#graphql">GraphQL</a></li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.tutorials}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1" class:bg-secondary-400={currentPage == "/docs/tutorials"}>Tutorials</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "insert"}><a href="/tutorials/basic">Basic Tutorial</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "update"}><a href="/tutorials/advanced">Advanced Tutorial</a></li>
                <li class="px-2 hover:bg-secondary-500" class:bg-secondary-400={currentSection == "delete"}><a href="/playground">Playground</a></li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.examples}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1" class:bg-secondary-400={currentPage == "/docs/examples"}>Examples</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul>
            </ul>
        </svelte:fragment>
    </AccordionItem>
</Accordion>


<style>
    ul {
        margin-left: 20px;
    }

    a:hover {
        opacity: 0.9;
    }

    button.rotate {
        transform: rotate(180deg);
    }
</style>