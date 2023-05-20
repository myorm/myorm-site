<script>
	import ScrollIntoViewAnchor from '$lib/components/buttons/ScrollIntoViewAnchor.svelte';
    import { Argument, ReturnType, Docs } from "$lib/components/syntax";
    import DocsExample from "$lib/components/syntax/DocsExample.svelte";
    import DocsExtra from '$lib/components/syntax/DocsExtra.svelte';

    const exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.hasOne(m => m.PlaylistTrack.withKeys("TrackId", "TrackId"));
ctx.include(m => m.PlaylistTrack)
    .select();
    `;

    const sqlCode = ``;

    const resultCode = ``;

    const example2exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.hasOne(m => m.PlaylistTrack.withKeys("TrackId", "TrackId")
        .andThatHasOne(m => m.PlaylistId).withKeys("PlaylistId", "PlaylistId"));
ctx.include(m => m.PlaylistTrack
    .thenInclude(m => m.Playlist))
    .select();
    `;

    const example2sqlCode = ``;

    const example2resultCode = ``;

    const example3exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.hasOne(m => m.PlaylistTrack.withKeys("TrackId", "TrackId"))
    .hasOne(m => m.Album.withKeys("AlbumId", "AlbumId"));
ctx.include(m => m.PlaylistTrack)
    .include(m => m.Album)
    .select();
    `;

    const example3sqlCode = ``;

    const example3resultCode = ``;

    const example4exampleCode = `import { MyORMContext } from "@myorm/myorm";
// initialize connection with desired adapter as \`connection\`.
const ctx: MyORMContext<Track> = new MyORMContext(connection, "Track"));
ctx.hasOne(m => m.PlaylistTrack.withKeys("TrackId", "TrackId")
        .andThatHasOne(m => m.Playlist.withKeys("PlaylistId", "PlaylistId")))
    .hasOne(m => m.Album.withKeys("AlbumId", "AlbumId"));
ctx.include(m => m.PlaylistTrack
        .thenInclude(m => m.Playlist))
    .include(m => m.Album)
    .select();
    `;

    const example4sqlCode = ``;

    const example4resultCode = ``;
</script>

<h2 class="h2">.include()</h2>
<div class="p-4">
    <Docs>
        <svelte:fragment slot="warning">
            To properly include a table into your query, you must configure the relationship using the <ScrollIntoViewAnchor isCode href="#has-one" label=".hasOne()"/>
            and/or <ScrollIntoViewAnchor isCode href="#has-many" label=".hasMany()"/> functions.
        </svelte:fragment>
        Include a related table with a <code class="code">JOIN</code>ing statement.
        <svelte:fragment slot="note">
            Records returned from queries (when aliasing does not occur) will be returned in the serialized version of their configuration.
            Meaning, if the included table is a one-to-many relationship, then the record returned will have the property as it was configured in the 
            <ScrollIntoViewAnchor isCode href="#has-one" label=".hasOne()"/> and/or <ScrollIntoViewAnchor isCode href="#has-many" label=".hasMany()"/> functions 
            with an Array of records of the included table, as it appears in the database.
            <br>
            If the included table is a one-to-one relationship, then it will be the object itself, with properties like the columns of the table.
        </svelte:fragment>
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
            <DocsExample {exampleCode} {sqlCode} {resultCode}>
                Example of including one related table.
            </DocsExample>
            <DocsExample exampleCode={example2exampleCode} sqlCode={example2sqlCode} resultCode={example2resultCode}>
                Example of including one related table, then including a nested related table on the included table.
            </DocsExample>
            <DocsExample exampleCode={example3exampleCode} sqlCode={example3sqlCode} resultCode={example3resultCode}>
                Example of including multiple related tables.
            </DocsExample>
            <DocsExample exampleCode={example4exampleCode} sqlCode={example4sqlCode} resultCode={example4resultCode}>
                Example of including multiple related tables, with some included tables further including nested related tables.
            </DocsExample>
        </svelte:fragment>
    </Docs>
</div>
