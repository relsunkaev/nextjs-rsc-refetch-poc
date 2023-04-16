"use client";

import { Suspense, useState } from "react";
import TableBody from "./TableBody";
import { createClientComponent } from "../helpers/createClientComponent";

const TableBodyClient = createClientComponent(TableBody);

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
