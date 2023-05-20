<script>
	import { sectionHistory } from './../../../lib/stores/section-history.js';
	import { previousSection, nextSection, hasHistory, hasFuture, sectionHistoryIdx } from '$lib/stores/section-history.js';
    import ConstructorSyntax from "./constructor.svelte";
    import AndThatHasMany from "./and-that-has-many.svelte";
    import AndThatHasOne from "./and-that-has-one.svelte";
    import HasOneSyntax from "./has-one.svelte";
    import HasMany from "./has-many.svelte";
    import { AppBar, AppShell, CodeBlock, storeHighlightJs } from "@skeletonlabs/skeleton";
    import { browser } from '$app/environment';
    import { appShellScrollY } from '../../+layout.svelte';
    import Where from './where.svelte';
    import WhereNot from './where-not.svelte';
    import Offset from './offset.svelte';
    import Limit from './limit.svelte';
    import GroupBy from './group-by.svelte';
    import SortBy from './sort-by.svelte';
    import Asc from './asc.svelte';
    import Desc from './desc.svelte';
    import ScrollIntoViewAnchor from '$lib/components/buttons/ScrollIntoViewAnchor.svelte';
    import Include from './include.svelte';
    import FromTable from './from-table.svelte';
    import WithKeys from './with-keys.svelte';
    import WithPrimary from './with-primary.svelte';
    import WithForeign from './with-foreign.svelte';
    import hljs from 'highlight.js';

    let currentSection = "Configuration";

    let chinookTypeCode = `
export interface Track {
    TrackId: number;
    Name: string;
    AlbumId: number;
    MediaTypeId: number;
    GenreId: number;
    Composer?: string;
    Milliseconds: number;
    Bytes: number;
    UnitPrice: number;
    // included
    Album?: Album;
    Artist?: Artist;
    Genre?: Genre;
    MediaType?: MediaType;
    PlaylistTrack?: PlaylistTrack;
};

export interface PlaylistTrack {
    PlaylistId: number;
    TrackId: number;
    // included
    Track?: Track;
    Playlist?: Playlist;
};

export interface Playlist {
    PlaylistId: number;
    Name: string;
    // included
    PlaylistTracks?: PlaylistTrack[];
};

export interface Album {
    AlbumId: number;
    Title: string;
    ArtistId: number;
    // included
    Artist?: Artist;
};`;
    let chinookSqlCode = `
CREATE TABLE Playlist
(
    PlaylistId INT NOT NULL,
    Name VARCHAR(120),
    CONSTRAINT PK_Playlist PRIMARY KEY  (PlaylistId)
);

CREATE TABLE PlaylistTrack
(
    PlaylistId INT NOT NULL,
    TrackId INT NOT NULL,
    CONSTRAINT PK_PlaylistTrack PRIMARY KEY  (PlaylistId, TrackId)
);

CREATE TABLE Track
(
    TrackId INT NOT NULL,
    Name VARCHAR(200) NOT NULL,
    AlbumId INT,
    MediaTypeId INT NOT NULL,
    GenreId INT,
    Composer VARCHAR(220),
    Milliseconds INT NOT NULL,
    Bytes INT,
    UnitPrice NUMERIC(10,2) NOT NULL,
    CONSTRAINT PK_Track PRIMARY KEY  (TrackId)
);

CREATE TABLE Album
(
    AlbumId INT NOT NULL,
    Title VARCHAR(160) NOT NULL,
    ArtistId INT NOT NULL,
    CONSTRAINT PK_Album PRIMARY KEY  (AlbumId)
);`;
    storeHighlightJs.set(hljs);

    function handleBack() {
        if(hasHistory()) {
            previousSection();
        }
    }

    function handleForward() {
        if(hasFuture()) {
            nextSection();
        }
    }

    $: {
        if(browser) {
            /** @type {HTMLElement[]} */
            let sections = Array.from(document.querySelectorAll("section > h1"));
            const [section] = sections.filter(s => {
                const _s = s.closest("section");
                if(!_s) return false;
                return _s.offsetTop + _s.offsetHeight - 13 > $appShellScrollY;
            }).sort((a,b) => a.offsetTop - b.offsetTop);
            currentSection = section?.innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">") ?? currentSection
        }
    }

    $: historyExists = $sectionHistoryIdx >= 0 && $sectionHistory.length > 0;
    $: futureExists = $sectionHistoryIdx < $sectionHistory.length-1 && $sectionHistory.length > 0;
</script>

<svelte:head>
    <title>MyORM - Reference</title>
</svelte:head>

<AppBar class="sticky top-0">
    <svelte:fragment slot="lead">
        <button on:click|preventDefault={handleBack} class:hidden={!historyExists}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
        </button>
    </svelte:fragment>
    <medium class="font-bold">{currentSection}</medium>
    <svelte:fragment slot="trail">
        <button on:click|preventDefault={handleForward} class:hidden={!futureExists}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
        </button>
    </svelte:fragment>
</AppBar>

<section class="label" id="configuration">
    <h1 class="h1">Configuration</h1>
    <p>
        All of the types used in this reference derives from the <a href="https://docs.yugabyte.com/preview/sample-data/chinook/">Chinook database</a>.
        Specifically, the types used are <code class="code">Track</code>, <code class="code">PlaylistTrack</code>, <code class="code">Playlist</code>, and <code class="code">Album</code>
    </p>
    <h3 class="h3 p-2">TypeScript</h3>
    <CodeBlock language="ts" code={chinookTypeCode} class="h-full"/>
    <h3 class="h3 p-2">SQL</h3>
    <CodeBlock language="sql" code={chinookSqlCode} class="h-full"/>
    <section id="constructor">
        <ConstructorSyntax/>
    </section>
    <hr>
    
    <section id="has-one">
        <HasOneSyntax/>
    </section>
    <hr>

    <section id="has-many">
        <HasMany/>
    </section>
    <hr>
    
    <section id="has-one-and-that-has-one">
        <AndThatHasOne/>
    </section>
    <hr>
    
    <section id="has-one-and-that-has-many">
        <AndThatHasMany/>
    </section>
    <hr>
    
    <section id="from-table">
        <FromTable/>
    </section>
    <hr>

    <section id="with-keys">
        <WithKeys/>
    </section>
    <hr>

    <section id="with-primary">
        <WithPrimary/>
    </section>
    <hr>

    <section id="with-foreign">
        <WithForeign/>
    </section>
    <hr>
</section>

<section class="label" id="clause-functions">
    <h1 class="h1">Clause Functions</h1>
    <p>
        All clause functions return a <ScrollIntoViewAnchor isCode href="#constructor" label="new MyORMContext"/> with a new state tailored to the original context and the new clauses added onto it.
        You can save these contexts as variables to create a "view" to consistently transact with it in that state without rebuilding clauses.
    </p>
    <section id="where">
        <Where/>
    </section>
    <hr>
    <section id="where-not">
        <WhereNot/>
    </section>
    <hr>
    <section id="limit">
        <Limit/>
    </section>
    <hr>
    <section id="offset">
        <Offset/>
    </section>
    <hr>
    <section id="group-by">
        <GroupBy/>
    </section>
    <hr>
    <section id="order-by">
        <SortBy/>
    </section>
    <hr>
    <section id="asc">
        <Asc/>
    </section>
    <hr>
    <section id="desc">
        <Desc/>
    </section>
    <hr>
    <section id="include">
        <Include/>
    </section>
    <hr>
    <section id="then-include"><h3 class="h3">.thenInclude()</h3></section>
    <hr>
</section>

<section class="label" id="filter-chains">
    <h1 class="h1">Filter Chains</h1>
    <section id="and"><h2 class="h2">.and()</h2></section>
    <hr>
    <section id="or"><h2 class="h2">.or()</h2></section>
    <hr>
</section>


<section class="label" id="filter-conditions">
    <h1 class="h1">Filter Conditions</h1>
    <section id="not"><h2 class="h2">.not()</h2></section>
    <hr>
    <section id="equals"><h2 class="h2">.equals()</h2></section>
    <hr>
    <section id="not-equals"><h2 class="h2">.notEquals()</h2></section>
    <hr>
    <section id="greater-than"><h2 class="h2">.greaterThan()</h2></section>
    <hr>
    <section id="greater-than-or-equal-to"><h2 class="h2">.greaterThanOrEqualTo()</h2></section>
    <hr>
    <section id="less-than"><h2 class="h2">.lessThan()</h2></section>
    <hr>
    <section id="less-than-or-equal-to"><h2 class="h2">.lessThanOrEqualTo()</h2></section>
    <hr>
    <section id="in"><h2 class="h2">.in()</h2></section>
    <hr>
    <section id="like"><h2 class="h2">.like()</h2></section>
    <hr>
    <section id="contains"><h2 class="h2">.contains()</h2></section>
    <hr>
</section>

<section class="label" id="aggregate-functions">
    <h1 class="h1">Aggregate Functions</h1>
</section>

<section class="label" id="explicit-transactions">
    <h1 class="h1">Explicit Transactions</h1>
</section>

<section class="label" id="implicit-transactions">
    <h1 class="h1">Implicit Transactions</h1>
</section>

<section class="label" id="event-handlers">
    <h1 class="h1">Event Handlers</h1>
</section>

<section class="label" id="types">
    <h1 class="h1">Types</h1>
    <section id="myorm-adapter"><h2 class="h2">&lt;MyORMAdapter&gt;</h2></section>
    <hr>
    <section id="success-handler"><h2 class="h2">&lt;SuccessHandler&gt;</h2></section>
    <hr>
    <section id="fail-handler"><h2 class="h2">&lt;FailHandler&gt;</h2></section>
    <hr>
    <section id="configuration-callback"><h2 class="h2">&lt;ConfigurationCallback&gt;</h2></section>
    <hr>
    <section id="where-callback"><h2 class="h2">&lt;WhereCallback&gt;</h2></section>
    <hr>
</section>

<style lang="postcss">
    h2 {
        text-indent: 20px;
    }
    
    h3 {
        text-indent: 40px;
    }

    hr {
        margin-top: 2.5%;
        margin-bottom: 2.5%;
    }

    section {
        min-height: 50vh;
    }

    section.label > h1 {
        min-height: auto;
        padding-bottom: 1%;
        margin-top: 2%;
        margin-bottom: 2%;
        @apply border-b-2;
    }
</style>