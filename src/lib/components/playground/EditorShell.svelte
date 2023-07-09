<script>
    import { AppShell } from "@skeletonlabs/skeleton";
    import TabGroup from "../tabs/TabGroup.svelte";
    import Tab from "../tabs/Tab.svelte";
    import MonacoEditor from "./MonacoEditor.svelte";

    /** @type {{name: string, language: string, code: string, namespaces?: { module: string, url?: string, source?: string }[]}[]}*/
    export var files;

    /** @type {{ module: string, url?: string, source?: string }[]}*/
    export var namespaces = [];
    $: _files = files.map(f => ({
        ...f,
        language: f.name?.endsWith(".ts") ? "typescript" : "javascript"
    }));
    $: namespaces = [...namespaces, ...files.filter(f => !namespaces.map(n => n.module).includes(`${f.name}`)).map(f => ({ module: `./${f.name}`, source: f.code }))];
    $: console.log({_files});
    /**
     * 
     * @param {CustomEvent} param0
     */
    function handleSelect({detail}) {
        const { selectedTab, staticProps } = detail;
        files[selectedTab] = staticProps;
    }
</script>

<AppShell>
    <TabGroup on:select={handleSelect} staticComponent={MonacoEditor}>
        {#each _files as file}
        <Tab name={file.name} staticProps={{...file, namespaces: [...file.namespaces ?? [], ...namespaces]}}/>
        {/each}
    </TabGroup>
</AppShell>