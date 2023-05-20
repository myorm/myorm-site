<script>
	import ScrollIntoViewAnchor from '$lib/components/buttons/ScrollIntoViewAnchor.svelte';
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";
    import DocsExample from "$lib/components/syntax/DocsExample.svelte";
    import DocsExtra from '$lib/components/syntax/DocsExtra.svelte';

    const exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.groupBy(m => m.Composer)
    .select();
    `;

    const sqlCode = ``;

</script>

<h2 class="h2">.include()</h2>
<div class="p-4">
    <Docs {exampleCode} {sqlCode}>
        Include a nested related table from an already included related table.
        <svelte:fragment slot="parameters">
            <Argument name="modelCallback" type="IncludeCallback">
                Callback that uses the <code class="code">model</code> parameter to get reference to the relationship properties to join on.
            </Argument>
        </svelte:fragment>
        <svelte:fragment slot="returns">
            <ReturnType type="MyORMContext">
                A new <code class="code">MyORMContext</code> class object with the same state as the original <code class="code">MyORMContext</code> and with the added state of the clause specified.
            </ReturnType>
        </svelte:fragment>
        <svelte:fragment slot="extra">
            <DocsExtra>
                The return type of your <code class="code">modelCallback</code> does not matter, as the configurations happen within the property referencing, using JavaScript <code class="code">Proxies</code>.
                For every property referenced, the property will automatically be included into the table, if a valid relationship has been configured.
            </DocsExtra>
            <DocsExtra>
                With each property reference, an object is returned which contains one function: <ScrollIntoViewAnchor isCode href="#then-include" label=".thenInclude()"/>, which can be used to include
                a nested relationship within the already included relationship.
                <svelte:fragment slot="note">
                    In order to further include nested relationships, they must be configured using the <ScrollIntoViewAnchor isCode href="#has-one-and-that-has-one" label=".andThatHasOne()"/>
                    and/or <ScrollIntoViewAnchor isCode href="#has-one-and-that-has-many" label=".andThatHasMany()"/> functions.
                </svelte:fragment>
            </DocsExtra>
        </svelte:fragment>
    </Docs>
</div>
