<script>
	import ScrollIntoViewAnchor from '$lib/components/buttons/ScrollIntoViewAnchor.svelte';
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";
    import DocsExample from "$lib/components/syntax/DocsExample.svelte";
    import DocsExtra from '$lib/components/syntax/DocsExtra.svelte';

    const example1exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.groupBy(m => m.Composer)
    .select();
    `;

    const example1sqlCode = ``;

    const example2exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.groupBy(m => [m.Composer, m.AlbumId])
    .select();
    `;

    const example2sqlCode = ``;

    const example3exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.groupBy((m, { avg, sum, min }) => [m.Composer, avg(m.Bytes), sum(m.Bytes), min(m.Bytes)])
    .select();
    `;

    const example3sqlCode = ``;

</script>

<h2 class="h2">.groupBy()</h2>
<div class="p-4">
    <Docs>
        Aggregate and group the results of your query based on the columns specified.
        <svelte:fragment slot="note">
            Resulting properties in your records from a query will contain aggregate information under property keys templated as <code class="code">$[aggregateName]_[propertyName]</code>,
            <br>
            where <code class="code">[aggregateName]</code> is the name of the aggregate function used,
            <br>
            and <code class="code">[propertyName]</code> is the name of your property.
            <br>
            The property name will be interpolated with further underscore characters (_) when the property is under a table name. (e.g., <code class="code">$avg_MyIncludedTableName_PropertyName</code>)
            <br>
            <medium class="font-bold">These will appropriately show in TypeScript and Intellisense.</medium>
        </svelte:fragment>
        <svelte:fragment slot="parameters">
            <Argument name="modelCallback" type="GroupByCallback">
                Callback that uses the <code class="code">model</code> parameter to get reference to the properties being grouped on.
            </Argument>
            <Argument name="aggregates" type="AggregateFunctions">
                Object containing various functions for aggregating data in some capacity.
            </Argument>
        </svelte:fragment>
        <svelte:fragment slot="returns">
            <ReturnType type="MyORMContext">
                A new <code class="code">MyORMContext</code> class object with the same state as the original <code class="code">MyORMContext</code> and with the added state of the clause specified.
            </ReturnType>
        </svelte:fragment>
        <svelte:fragment slot="extra">
            <DocsExtra>
                The return type of your <code class="code">modelCallback</code> can either be a string or an Array of strings, where a single string would be one property you are grouping by (or aggregations),
                while an Array is multiple properties or aggregations.
                <svelte:fragment slot="functions">
                    <ScrollIntoViewAnchor isCode href="#avg" label="avg()"/>: Retrieves the average per the column specified across all records within a group.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#count" label="count()"/>: Retrieves the distinct number of values per the column specified across all records within a group.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#min" label="min()"/>: Retrieves the minimum per the column specified across all records within a group.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#max" label="max()"/>: Retrieves the maximum per the column specified across all records within a group.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#sum" label="sum()"/>: Retrieves the total sum per the column specified across all records within a group.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#total" label="total()"/>: Retrieves the total number of records within a group.
                </svelte:fragment>
            </DocsExtra>
            <DocsExample>
                Columns are grabbed per the property reference from the <code class="code">model</code> parameter in the <code class="code">modelCallback</code> function-- 
                These property references will return their actual column name (or otherwise their property name you referenced). 
                <br>
                You can use these references alone or you can use them in an aggregate function.
            </DocsExample>
            <DocsExample exampleCode={example1exampleCode} sqlCode={example1sqlCode}>
                Example with grouping by one column.
            </DocsExample>
            <DocsExample exampleCode={example2exampleCode} sqlCode={example2sqlCode}>
                Example with grouping by multiple columns.
            </DocsExample>
            <DocsExample exampleCode={example3exampleCode} sqlCode={example3sqlCode}>
                Example with grouping and retrieving aggregate information.
            </DocsExample>
        </svelte:fragment>
    </Docs>
</div>
