<script context="module">
    import { writable } from 'svelte/store';

    /** @type {import('svelte/store').Writable<import('monaco-editor').editor.IStandaloneCodeEditor>}*/
    const editor = writable();
</script>

<script>
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import { AppShell } from '@skeletonlabs/skeleton';
    import { browser } from '$app/environment';
    const dispatch = createEventDispatcher();

    export var code = "";
    export var language = "";
    export var name = "";
    /** @type {{ module: string, url?: string, source?: string }[]} */
    export var namespaces = [];
    /** @type {HTMLDivElement} */
    let divEl;
    /** @type {import('monaco-editor')}*/
    let Monaco;
    onMount(async () => {
        if(name == "" && language == "") return;
        console.log(`Initialized editor with name, "${name}"`);
        return await handleInit();
    });

    onDestroy(async () => {
        console.log(`Destroyed editor with name, "${name}"`);
        return handleDispose();
    })

    async function handleInit() {
        // @ts-ignore
        self.MonacoEnvironment = {
            /** @type {(_moduleId: any, label: string) => Worker}*/
            getWorker: function (_moduleId, label) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };
        Monaco = await import('monaco-editor');
        if(language === "typescript" || language === "javascript") {
            Monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
            console.log({namespaces});
            // set default namespaces
            namespaces.forEach(async (namespace) => {
                if(!namespace.source) {
                    if(namespace.url) {
                        let res = await fetch(namespace.url);
                        if(!res.ok) throw Error(`Could not fetch source from "${namespace.url}" for module, "${namespace.module}".`);
                        namespace.source = await res.text();
                    }
                }
                
                if(!namespace.source) {
                    throw Error(`No URL or source code provided for "${namespace.module}".`);
                }
                Monaco.languages.typescript.typescriptDefaults.addExtraLib(`
                    declare module '${namespace.module}' { ${namespace.source} }; `
                );
            })
        }
        if(!$editor) {
            console.log("Creating model");
            $editor = Monaco.editor.create(divEl, {
                model: Monaco.editor.createModel(code, language, Monaco.Uri.file(name))
            });
        } else {
            console.log(`Setting model to ${name}`);
            $editor.setModel(Monaco.editor.createModel(code, language, Monaco.Uri.file('main.tsx')));
        }

        return () => {
            $editor.dispose();
        };
    }

    function handleDispose() {
        if(!$editor || !Monaco.editor) return;
        dispatch('dispose', { code: $editor.getValue() });
        //@ts-ignore
        Monaco.editor.getModels().forEach(model => {
            model.dispose();
        });
    }

    function handleKeyup() {
        if(!$editor) return; 
        code = $editor.getValue();
    }

    $: {
        name;
        if(browser) {
            handleDispose();
            handleInit();
        }
    }
</script>

<div bind:this={divEl} class="h-full w-full" on:keyup={handleKeyup}/>