<script>
    import { scrollIntoView } from "$lib/functions";
    /** @type {string} */
    export let href;
    /** @type {string} */
    export let label;

    /** @type {boolean} */
    export let isCode = false;
</script>

<a class:code={isCode} class="underline hover:opacity-90" {href} on:click|preventDefault={scrollIntoView}>{label}</a>