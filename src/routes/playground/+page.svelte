<script>
    import MonacoEditor from "$lib/components/playground/MonacoEditor.svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { oneDark } from "@codemirror/theme-one-dark";
    import EditorShell from "$lib/components/playground/EditorShell.svelte";

    let code = `import { MyORMContext } from "@myorm/myorm";
import { adapter } from "@myorm/json-adapter";

interface Track {
    TrackId: number;
    AlbumId: number;
    Name: string;
    Bytes: number;
    UnitPrice: number;

    Album?: Album;
    PlaylistTrack?: PlaylistTrack;
};

interface Playlist {
    PlaylistId: number;
    Name: string;

    PlaylistTracks?: PlaylistTrack[]
};

interface PlaylistTrack {
    PlaylistTrackId: number;
    PlaylistId: number;
    TrackId: number;

    Playlist?: Playlist;
    Track?: Track;
};

interface Album {
    AlbumId: number;
    Title: string;

    Track?: Track;
};

const db = {
    Track: [],
    Playlist: [],
    PlaylistTrack: [],
    Album: []
};
const cnn = adapter({ 
    $schema: {
        Track: {
            TrackId: {
                table: "Track",
                field: "TrackId",
                alias: "",
                isPrimary: true,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            AlbumId: {
                table: "Track",
                field: "AlbumId",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            Name: {
                table: "Track",
                field: "Name",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            Bytes: {
                table: "Track",
                field: "Bytes",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            UnitPrice: {
                table: "Track",
                field: "UnitPrice",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            }
        },
        Playlist: {
            PlaylistId: {
                table: "Track",
                field: "TrackId",
                alias: "",
                isPrimary: true,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            Name: {
                table: "Track",
                field: "Name",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            }
        },
        PlaylistTrack: {
            PlaylistTrackId: {
                table: "Track",
                field: "PlaylistTrackId",
                alias: "",
                isPrimary: true,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            TrackId: {
                table: "Track",
                field: "TrackId",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            PlaylistId: {
                table: "Track",
                field: "PlaylistId",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            }
        },
        Album: {
            AlbumId: {
                table: "Track",
                field: "AlbumId",
                alias: "",
                isPrimary: true,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            },
            Title: {
                table: "Track",
                field: "Title",
                alias: "",
                isPrimary: false,
                isIdentity: false,
                isVirtual: false,
                defaultValue: () => undefined
            }
        }
    }, 
    $data: db 
});
const tracks: MyORMContext<Track> = new MyORMContext(cnn, "Track");
const playlists: MyORMContext<Playlist> = new MyORMContext(cnn, "Playlist");

export const contexts = {
    tracks,
    playlists
};`;

const mainCode = `import { contexts } from './database.ts';

contexts.tracks.select().then(results => {
    console.log(results);
});
`

const namespaces = [
    { module: "@myorm/myorm", url: "https://unpkg.com/@myorm/myorm/dist/dts/index.d.ts" },
    { module: "@myorm/json-adapter", url: "https://unpkg.com/@myorm/json-adapter/dist/dts/index.d.ts" }
];

const files = [
    { name: "main.ts", code: mainCode, language:"typescript" }, 
    { name: "database.ts", code, language:"typescript" }
];
</script>

<EditorShell {files} {namespaces}/>