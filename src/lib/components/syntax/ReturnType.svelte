<script>
    import { scrollIntoView } from "$lib/functions";
    import { typeMap } from ".";

    /** @type {keyof typeof $typeMap | "string" | "number"} */
    export let type;
</script>

<li>
    {#if type in $typeMap} 
    <a on:click|preventDefault={scrollIntoView} href={$typeMap[/** @type {keyof typeof $typeMap} */ (type)]} class="code underline">&lt;{type}&gt;</a> - <slot/>
    {:else}
    <code class="code">&lt;{type}&gt;</code> - <slot/>
    {/if}
</li>