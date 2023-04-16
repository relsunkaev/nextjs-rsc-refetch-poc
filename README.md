# Next.js React Server Components Refetch PoC

This repository contains a proof of concept for importing React Server Components on the client-side and refetching them from the server when their props change.

## Internals

This works by creating an api route that dynamically imports server compnents from the path provided in the search params and renders them to RSC format using props provided in the body. Client-side, `createClientComponent` generates a React component that fetches the RSC Format from the api route and renders it whenver props change. The response of the `rsc` endpoint is cached (although the cache settings are not adjustable here).

## Caveats

- This requires you to set a `url` property on your server component. This is because the api route needs to know where to import the component from. I wish we could do things like `<const T,>(path: T) => typeof import(T)` but alas, `typeof import` doesn't accept generics.
- I didn't bother implementing any kind of prefetching.

## Example

```tsx
// ./src/app/components/Table.tsx
"use client";

import { Suspense, useState } from "react";
import TableBody from "./TableBody";
import { createClientComponent } from "../helpers/createClientComponent";

const TableBodyClient = createClientComponent(TableBody);

export function Table() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col gap-4 select-none">
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
          <TableBodyClient page={page} pageSize={10} />
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
export default async function TableBody({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
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

TableBody.url = import.meta.url;
```
