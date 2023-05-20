<script>
    import { scrollIntoView } from "$lib/functions";
    import { currentSection, setSection } from "$lib/stores/current-section";
    import { pushSection } from "$lib/stores/section-history";
    import { typeMap } from ".";

    /** @type {string} */
    export let name;
    /** @type {keyof typeof $typeMap | "string" | "number"} */
    export let type;
</script>

<li>
    <code class="code">{name}</code>: 
    {#if type in $typeMap} 
    <a on:click|preventDefault={scrollIntoView} href={$typeMap[/** @type {keyof typeof $typeMap} */ (type)]} class="code underline">&lt;{type}&gt;</a> - <slot/>
    {:else}
    <code class="code">&lt;{type}&gt;</code> - <slot/>
    {/if}
</li>
