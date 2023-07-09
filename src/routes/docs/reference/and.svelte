<script>
	import ScrollIntoViewAnchor from '$lib/components/buttons/ScrollIntoViewAnchor.svelte';
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";
    import DocsExample from "$lib/components/syntax/DocsExample.svelte";
    import DocsExtra from '$lib/components/syntax/DocsExtra.svelte';

    const exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.where(m => m.TrackId.equals(20).and(m => m.))
    .select();`;

    const sqlCode = ``;

    const chainingExampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.where(m => m.TrackId.equals(20)
    .and(m => m.Composer.equals("AC/DC"))
    .or(m => m.Name.equals("Dog Eat Dog")))
    .select();`;

    const chainingSqlCode = ``;

    const nestingExampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.where(m => m.TrackId.equals(20)
    .and(m => m.Composer.equals("AC/DC")
        .or(m => m.Name.equals("Dog Eat Dog"))))
    .select();`;

    const nestingSqlCode = ``;

    const sequentialExampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.where(m => m.TrackId.equals(20))
    .where(m => m.Name.equals("AC/DC"))
    .select();`;

    const sequentialSqlCode = ``;

</script>

<h2 class="h2">.and()</h2>
<div class="p-4">
    <Docs {exampleCode} {sqlCode}>
        Chain a condition sequentially onto the filter for the command.
        <svelte:fragment slot="parameters">
            <Argument name="modelCallback" type="WhereCallback">
                A callback to determine the filter to chain/nest. The callback uses the <code class="code">model</code> parameter to get reference to the properties being filtered on.
            </Argument>
        </svelte:fragment>
        <svelte:fragment slot="returns">
            <ReturnType type="Chain">
                A <code class="code">Chain</code> object, containing the same <code class="code">.and()</code> and <code class="code">.or()</code> functions that can be used to continue chaining or nesting more conditions.    
            </ReturnType>
        </svelte:fragment>
        <svelte:fragment slot="extra">
            <DocsExample {exampleCode} {sqlCode}>
                The <ScrollIntoViewAnchor isCode href="#where-callback" label="<WhereCallback>"/> type has a parameter that resembles
                the structure of your table, and with every property reference, an object containing various <ScrollIntoViewAnchor href="#filter-conditions" label="Filter Condition Functions"/> is returned. 
                <svelte:fragment slot="functions">
                    <ScrollIntoViewAnchor isCode href="#not" label=".not()"/>: Negates the filter condition that will be applied. <small class="italic">(this would be called before the filter condition)</small>
                    <br>
                    <ScrollIntoViewAnchor isCode href="#equals" label=".equals()"/>: Checks if the referenced property (column) is equal to the value provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#not-equals" label=".notEquals()"/>: Checks if the referenced property (column) is not equal to the value provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#greater-than" label=".greaterThan()"/>: Checks if the referenced property (column) is greater than the value provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#greater-than-or-equal-to" label=".greaterThanOrEqualTo()"/>: Checks if the referenced property (column) is greater than or equal to the value provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#less-than" label=".lessThan()"/>: Checks if the referenced property (column) is less than the value provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#less-than-or-equal-to" label=".lessThanOrEqualTo()"/>: Checks if the referenced property (column) is less than or equal to the value provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#in" label=".in()"/>: Checks if the referenced property (column) is equal to one of the values provided.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#like" label=".like()"/>: Checks if the referenced property (column) is like the value provided, where the value is defined as SQL's <code class="code">LIKE</code> syntax.
                    <small class="italic">case insensitive</small>
                    <br>
                    <ScrollIntoViewAnchor isCode href="#contains" label=".contains()"/>: Checks if the referenced property (column) contains the value provided. (Uses SQL's <code class="code">LIKE</code> syntax in the form of <code class="code">%[value]%</code>) 
                    <small class="italic">case insensitive</small>
                </svelte:fragment>
            </DocsExample>
            <DocsExample>
                After applying your desired filter condition, the return type of that is another object containing various <ScrollIntoViewAnchor href="#filter-chains" label="Filter Chain Functions"/>,
                which can be used to apply additional conditions to your query.
                <svelte:fragment slot="functions">
                    <ScrollIntoViewAnchor isCode href="#and" label=".and()"/>: Applies a condition in sequence on to the condition added this call comes from.
                    <br>
                    <ScrollIntoViewAnchor isCode href="#or" label=".or()"/>: Applies a condition in parallel on to the condition added this call comes from.
                </svelte:fragment>
            </DocsExample>
            <DocsExample exampleCode={nestingExampleCode} sqlCode={nestingSqlCode}>
                With every <ScrollIntoViewAnchor href="#filter-conditions" label="Filter Condition"/> used, an object is returned with these chaining functions.
                <br>
                If you chain these chaining functions onto a <ScrollIntoViewAnchor href="#filter-conditions" label="Filter Condition"/> function, then you will nest the filter, otherwise you will chain it.
            </DocsExample>
            <DocsExample exampleCode={sequentialExampleCode} sqlCode={sequentialSqlCode}>
                Each call of the <ScrollIntoViewAnchor isCode href="#where" label=".where()"/> or <ScrollIntoViewAnchor isCode href="#where-not" label=".whereNot()"/> function results in a sequential addition to your filters, 
                meaning you can chain <ScrollIntoViewAnchor isCode href="#where" label=".where()"/> with another <ScrollIntoViewAnchor isCode href="#where" label=".where()"/>
                and that is the equivalent of <code class="code">.where(m => m.MyProperty.equals(1).and(m => m.MyOtherProperty.equals(2)))</code>
            </DocsExample>
        </svelte:fragment>
    </Docs>
</div>
