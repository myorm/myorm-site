<script>
	import ScrollIntoViewAnchor from '$lib/components/buttons/ScrollIntoViewAnchor.svelte';
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";
    import DocsExample from "$lib/components/syntax/DocsExample.svelte";
    import DocsExtra from '$lib/components/syntax/DocsExtra.svelte';

    const example1exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.sortBy(m => m.Composer)
    .select();
    `;

    const example1sqlCode = ``;

    const example2exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.sortBy(m => [m.Composer, m.Bytes])
    .select();
    `;

    const example2sqlCode = ``;

    const example3exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.sortBy(m => [m.Composer, m.Bytes.desc(), m.UnitPrice.asc()])
    .select();
    `;

    const example3sqlCode = ``;

</script>

<h2 class="h2">.sortBy()</h2>
<div class="p-4">
    <Docs synonyms={["orderBy"]}>
        Sort the results of your query by the property or properties specified.
        <svelte:fragment slot="parameters">
            <Argument name="modelCallback" type="SortByCallback">
                Callback that uses the <code class="code">model</code> parameter to get reference to the properties being filtered on.
            </Argument>
        </svelte:fragment>
        <svelte:fragment slot="returns">
            <ReturnType type="MyORMContext">
                A new <code class="code">MyORMContext</code> class object with the same state as the original <code class="code">MyORMContext</code> and with the added state of the clause specified.
            </ReturnType>
        </svelte:fragment>
        <svelte:fragment slot="extra">
            <DocsExtra>
                The return type of your <code class="code">modelCallback</code> will be an object (or Array of objects) specifying the property name you used and a direction to sort that column name by.
                <br>
                Each property reference will return a corresponding object with functions to specify direction. 
                <svelte:fragment slot="functions">
                    <ScrollIntoViewAnchor isCode href="#asc" label=".asc()"/>: Specifies the direction to sort that column by to be in <code class="code">ASCENDING</code> order.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#desc" label=".desc()"/>: Specifies the direction to sort that column by to be in <code class="code">DESCENDING</code> order.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#asc" label=".ascending()"/>: Specifies the direction to sort that column by to be in <code class="code">ASCENDING</code> order.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#desc" label=".descending()"/>: Specifies the direction to sort that column by to be in <code class="code">DESCENDING</code> order.
                    <br>
                </svelte:fragment>
                <svelte:fragment slot="note">
                    You do not need to specify a direction function, the default is in <code class="code">ASCENDING</code> order, as SQL intends.
                </svelte:fragment>
            </DocsExtra>
            <DocsExample exampleCode={example1exampleCode} sqlCode={example1sqlCode}>
                Example with sorting by one column.
            </DocsExample>
            <DocsExample exampleCode={example2exampleCode} sqlCode={example2sqlCode}>
                Example with sorting by multiple columns.
            </DocsExample>
            <DocsExample exampleCode={example3exampleCode} sqlCode={example3sqlCode}>
                Example with sorting by multiple columns in varying directions.
            </DocsExample>
        </svelte:fragment>
    </Docs>
</div>
