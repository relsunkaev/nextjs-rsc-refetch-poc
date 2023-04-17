# Next.js React Server Components Refetch PoC

This repository contains a proof of concept for importing React Server Components on the client-side and refetching them from the server when their props change.

## Internals

This works by creating an api route that dynamically imports server compnents from the path provided in the search params and renders them to RSC format using props provided in the body. Client-side, `importServerComponent` generates a React component that fetches the RSC Format from the api route and renders it whenver props change. The response of the `rsc` endpoint is cached (although the cache settings are not adjustable here).

## Caveats

- This breaks if you try to import from somewhere that exports "metadata". In this case, I just put the components in a separate folder.
- Must specify props type for `importServerComponent`. I wish I could define it as something like
  ```ts
  <const Path extends string>(path: Path) => typeof import(Path)
  ```
  but alas, `import` does not accept generics...
- I didn't bother implementing any kind of prefetching.

## Example

```tsx
// ./src/app/components/Table.tsx
"use client";

import { Suspense, useState } from "react";
import { importServerComponent } from "../helpers/importServerComponent";
import type { TableBodyProps } from "./TableBody"; // *Must* import as type

const TableBodyClient = importServerComponent<TableBodyProps>("./TableBody"); // Must specify props type :(

export function Table() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex justify-end">
        <select
          className="outline-none bg-neutral-100 rounded-lg py-2 px-4 shadow-md"
          onChange={(e) => setPageSize(Number(e.target.value) || 10)}
          value={pageSize}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table className="w-80 max-h-[20rem] bg-neutral-100 overflow-auto rounded-lg shadow-md whitespace-nowrap select-text">
        <thead>
          <tr className="border-b border-neutral-400">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <Suspense
          fallback={
            <tbody>
              <tr>
                <td className="flex justify-center items-center py-2 px-4">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
        >
          <TableBodyClient page={page} pageSize={pageSize} />
        </Suspense>
      </table>
      <div className="w-full flex justify-between">
        <button
          className="py-2 px-4 shadow-md bg-neutral-100 hover:scale-105 active:shadow-inner transition-all duration-150 text-neutral-800 rounded-lg"
          onClick={() => setPage((page) => page - 1)}
        >
          Back
        </button>
        <Suspense />
        <button
          className="py-2 px-4 shadow-md hover:scale-105 bg-neutral-100 active:shadow-inner transition-all duration-150 text-neutral-800 rounded-lg"
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

```tsx
// ./src/app/components/TableBody.tsx
export type TableBodyProps = {
  page: number;
  pageSize: number;
};

export default async function TableBody({ page, pageSize }: TableBodyProps) {
  const data = await getData(page, pageSize);
  return (
    <tbody>
      {data.map((v, index) => (
        <tr key={index}>
          <td className="py-2 px-4">{v.firstName}</td>
          <td className="py-2 px-4">{v.lastName}</td>
          <td className="py-2 px-4">{v.email}</td>
        </tr>
      ))}
    </tbody>
  );
}
```
