<script>
	import { CodeBlock, storeHighlightJs } from '@skeletonlabs/skeleton';
    import { TabGroup, Tab } from "$lib/components/tabs/index.js";
    import hljs from 'highlight.js';

    /** @type {string?} */
    export let exampleCode = null;
    /** @type {string?} */
    export let sqlCode = null;
    /** @type {string?} */
    export let resultCode = null;

    storeHighlightJs.set(hljs);
    
</script>

{#if $$slots.warning}
    <div class="rounded-md text-primary-900 bg-warning-300 m-4 p-4">
        <h3 class="h3 underline">WARNING</h3>
        <slot name="warning"/>
    </div>
{/if}
<div class="content-center w-full h-full">
    <div class="m-4">
        <slot/>
    </div>
    <TabGroup>
        {#if $$slots.functions}
        <Tab name="Functions">
            <slot name="functions"/>
        </Tab>
        {/if}
        {#if exampleCode != null}
        <Tab name="Example">
            <CodeBlock language="ts" code={exampleCode} class="h-full" background="bg-secondary-filled"/>
        </Tab>
        {/if}
        {#if sqlCode != null}
        <Tab name="MySQL">
            <CodeBlock language="sql" code={sqlCode} class="h-full" background="bg-secondary-filled"/>
        </Tab>
        {/if}
        {#if resultCode != null}
        <Tab name="Result">
            <CodeBlock language="text" code={resultCode} class="h-full" background="bg-secondary-filled"/>
        </Tab>
        {/if}
    </TabGroup>
</div>
{#if $$slots.note}
    <div class="rounded-md text-primary-900 bg-success-300 m-4 p-4">
        <h3 class="h3 underline">NOTE</h3>
        <slot name="note"/>
    </div>
{/if}
