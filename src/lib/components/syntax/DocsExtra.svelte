<script>
    import { TabGroup, Tab } from "$lib/components/tabs/index.js";
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
        {#if $$slots.parameters}
        <Tab name="Parameters">
            <slot name="parameters"/>
        </Tab>
        {/if}
        {#if $$slots.returns}
        <Tab name="Returns">
            <slot name="returns"/>
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
