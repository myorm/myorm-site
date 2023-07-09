import { writable } from "svelte/store";

export { default as Argument } from "./Argument.svelte";
export { default as ReturnType } from "./ReturnType.svelte";
export { default as Docs } from "./Docs.svelte";

export const typeMap = writable({
    MyORMContext: "#constructor",
    MyORMAdapter: "#myorm-adapter",
    TTableModel: "#ttablemodel",
    ConfigurationCallback: "#configuration-callback",
    WhereCallback: "#where-callback",
    GroupByCallback: "#group-by-callback",
    AggregateFunctions: "#aggregate-functions",
    SortByCallback: "#sort-by-callback",
    IncludeCallback: "#include-callback",
    Chain: "#chain"
});