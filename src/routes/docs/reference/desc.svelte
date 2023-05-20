<script>
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";

    const exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.sortBy(m => m.Composer.desc())
    .select();`;

    const sqlCode = ``;
</script>

<h2 class="h2">.desc()</h2>
<div class="p-4">
    <Docs {exampleCode} {sqlCode} synonyms={["descending"]}>
        Specifies the direction of a property being sorted on to be in <code class="code">DESCENDING</code> order.
        <svelte:fragment slot="returns">
            <ReturnType type="MyORMContext">
                A new <code class="code">MyORMContext</code> class object with the same state as the original <code class="code">MyORMContext</code> and with the added state of the clause specified.
            </ReturnType>
        </svelte:fragment>
    </Docs>
</div>
