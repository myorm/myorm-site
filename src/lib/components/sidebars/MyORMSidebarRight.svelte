<script>
    import { currentSection, setSection } from "$lib/stores/current-section";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import { appShellScrollY } from "../../../routes/+layout.svelte";
    import { browser } from "$app/environment";
    import { pushSection } from "$lib/stores/section-history";
    
    let scrollY = 0;

    /** @type {any} */
    const accordionItemOpenStates = {
        configuration: true,
        clauseFunctions: true,
        filterChains: true,
        filterConditions: true,
        aggregateFunctions: true,
        explicitTransactions: true,
        implicitTransactions: true,
        eventHandlers: true,
        types: true
    };

    /**
     * @param {MouseEvent} e 
     */
    function scrollIntoView({ currentTarget }) {
        //@ts-ignore
        const href = currentTarget.getAttribute('href');
		const el = document.querySelector(href);
        setSection(href);
        pushSection(href);
		if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth'
        });
    }

    function handleClickToggleOpen() {
        const open = !(Object.values(accordionItemOpenStates).filter(v => v).length > 0);
        for(const key in accordionItemOpenStates) {
            accordionItemOpenStates[key] = open;
        }
    }

    // when app shell scroll y changes, update the right sidebar current section appropriately.
    $: {
        if(browser) {
            /** @type {HTMLElement[]} */
            let sections = Array.from(document.querySelectorAll("section > h2"));
            const [section] = /** @type {HTMLElement[]} */ (sections.map(s => s.closest("section")).filter(s => s != null && s.offsetTop + s.offsetHeight - 90 > $appShellScrollY)); 
            if(section) {
                setSection(`#${section.id}`);
            }
        }
    }
</script>

<svelte:window bind:scrollY></svelte:window>
<Accordion>
    <div class="float-left sticky top-0 variant-filled-secondary w-full pt-2">
        <button class="{Object.values(accordionItemOpenStates).filter(v => v).length > 0 ? "rotate" : ""} btn p-1" on:click={handleClickToggleOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
    </div>
    <AccordionItem bind:open={accordionItemOpenStates.configuration}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Configuration</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#constructor"}>
                    <a on:click|preventDefault={scrollIntoView} href="#constructor">new MyORMContext()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#has-one"}>
                    <a on:click|preventDefault={scrollIntoView} href="#has-one">.hasOne()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#has-many"}>
                    <a on:click|preventDefault={scrollIntoView} href="#has-many">.hasMany()</a>
                </li>
                <li class="px-2 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#has-one-and-that-has-one"}>
                    <a on:click|preventDefault={scrollIntoView} href="#has-one-and-that-has-one">.andThatHasOne()</a>
                </li>
                <li class="px-2 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#has-one-and-that-has-many"}>
                    <a on:click|preventDefault={scrollIntoView} href="#has-one-and-that-has-many">.andThatHasMany()</a>
                </li>
                <ul class="h-auto">
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#from-table"}>
                        <a on:click|preventDefault={scrollIntoView} href="#from-table"><small>.fromTable()</small></a>
                    </li>
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#with-keys"}>
                        <a on:click|preventDefault={scrollIntoView} href="#with-keys"><small>.withKeys()</small></a>
                    </li>
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#with-primary"}>
                        <a on:click|preventDefault={scrollIntoView} href="#with-primary"><small>.withPrimary()</small></a>
                    </li>
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#with-foreign"}>
                        <a on:click|preventDefault={scrollIntoView} href="#with-foreign"><small>.withForeign()</small></a>
                    </li>
                </ul>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.clauseFunctions}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Clause Functions</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#where"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#where">.where()</a>
                </li>
                <ul class="h-auto">
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#not-property-accessor"}>
                        <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#not-property-accessor">
                            <small>.not</small>
                        </a>
                    </li>
                </ul>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#limit"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#limit">.take()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#offset"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#offset">.skip()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#group-by"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#group-by">.groupBy()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#order-by"}>
                    <a on:click|preventDefault={scrollIntoView} class="" href="#order-by">.sortBy()</a>
                </li>
                <ul class="h-auto">
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#asc"}>
                        <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#asc">
                            <small>.asc()</small>
                        </a>
                    </li>
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#desc"}>
                        <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#desc">
                            <small>.desc()</small>
                        </a>
                    </li>
                </ul>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#include"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#include">.include()</a>
                </li>
                <ul class="h-auto">
                    <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#then-include"}>
                        <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#then-include">
                            <small>.thenInclude()</small>
                        </a>
                    </li>
                </ul>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.filterChains}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Filter Chains</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#and"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#and">.and()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#or"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#or">.or()</a>
                </li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.filterConditions}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Filter Conditions</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#not"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#not">.not</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#equals"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#equals">.equals()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#not-equals"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#not-equals">.notEquals()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#greater-than"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#greater-than">.greaterThan()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#greater-than-or-equal-to"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#greater-than-or-equal-to">.greaterThanOrEqualTo()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#less-than"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#less-than">.lessThan()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#less-than-or-equal-to"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#less-than-or-equal-to">.lessThanOrEqualTo()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#in"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#in">.in()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#like"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#like">.like()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#contains"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#contains">.contains()</a>
                </li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.aggregateFunctions}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Aggregate Functions</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#avg"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#avg">avg()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#count"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#count">count()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#min"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#min">min()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#max"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#max">max()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#sum"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#sum">sum()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#total"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#total">total()</a>
                </li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.explicitTransactions}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Transactional Functions</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#select"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#select">&lt;async&gt; .select()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#count"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#count">&lt;async&gt; .count()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#insert"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#update-select">&lt;async&gt; .insert()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#update"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#delete-select">&lt;async&gt; .update()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#delete"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#delete-select">&lt;async&gt; .update()</a>
                </li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.eventHandlers}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Event Handlers</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#on-success"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#on-success">.onSuccess()</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#on-fail"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#on-fail">.onFail()</a>
                </li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={accordionItemOpenStates.types}>
        <svelte:fragment slot="summary">
            <medium class="px-2 py-1">Types</medium>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <ul class="h-auto">
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#myorm-adapter"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#myorm-adapter">MyORMAdapter</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#success-handler"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#success-handler">SuccessHandler</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#fail-handler"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#fail-handler">FailHandler</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#configuration-callback"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#configuration-callback">ConfigurationCallback</a>
                </li>
                <li class="px-1 hover:bg-tertiary-hover-token" class:border-l-4={$currentSection == "#where-callback"}>
                    <a on:click|preventDefault={scrollIntoView} class="px-1 hover:bg-tertiary-hover-token" href="#where-callback">WhereCallback</a>
                </li>
            </ul>
        </svelte:fragment>
    </AccordionItem>
</Accordion>


<style>
    ul {
        margin-left: 20px;
    }

    button.rotate {
        transform: rotate(180deg);
    }
</style>