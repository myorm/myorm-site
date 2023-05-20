<script>
    import ScrollIntoViewAnchor from "$lib/components/buttons/ScrollIntoViewAnchor.svelte";
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";

    const exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Playlist"));
ctx.hasMany(m => m.PlaylistTracks.fromTable("PlaylistTrack").withKeys("TrackId", "TrackId")
    .andThatHasMany(m => m.Track))`;
    
    const sqlCode = `SELECT * ...`
</script>

<h2 class="h2">.andThatHasMany()</h2>
<div class="p-4">
    <Docs {exampleCode}>
        Further configure a one-to-many relationship from the last configured relationship on your <code class="code">MyORMContext</code> class object to be included in future queries.
        <svelte:fragment slot="note">
            This call will only send a command to your database asking for information about the table. (or otherwise, <code class="code">DESCRIBE</code> the table)
            <br>
            To include the table as a <code class="code">JOIN</code> statement, then you need to use <ScrollIntoViewAnchor isCode href="#include" label=".include()"/>.
        </svelte:fragment>
        <svelte:fragment slot="parameters">
            <Argument name="modelCallback" type="ConfigurationCallback">
                Callback that uses the <code class="code">model</code> parameter to get reference to the property being configured.
            </Argument>
        </svelte:fragment>
        <svelte:fragment slot="returns">
            <ReturnType type="MyORMContext">
                Same reference to the <code class="code">MyORMContext</code> class object.
            </ReturnType>
        </svelte:fragment>
    </Docs>
</div>