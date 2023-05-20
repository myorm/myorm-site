<script>
    import ScrollIntoViewAnchor from "$lib/components/buttons/ScrollIntoViewAnchor.svelte";
import { Argument, ReturnType, Docs } from "$lib/components/syntax";

    const exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.skip(5)
    .take(10)
    .select();`;

    const sqlCode = ``;
</script>

<h2 class="h2">.skip()</h2>
<div class="p-4">
    <Docs {exampleCode} {sqlCode}>
        Skip a number of records before retrieving the records you want.
        <svelte:fragment slot="warning">
            <code class="code">.skip()</code> only works when a <ScrollIntoViewAnchor isCode href="#limit" label=".take()"/> clause function has been provided.
        </svelte:fragment>
        <svelte:fragment slot="parameters">
            <Argument name="limit" type="number">
                Number of records to skip.
            </Argument>
        </svelte:fragment>
        <svelte:fragment slot="returns">
            <ReturnType type="MyORMContext">
                A new <code class="code">MyORMContext</code> class object with the same state as the original <code class="code">MyORMContext</code> and with the added state of the clause specified.
            </ReturnType>
        </svelte:fragment>
    </Docs>
</div>
