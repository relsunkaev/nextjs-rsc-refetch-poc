import { NextRequest } from "next/server";
import React from "react";
// @ts-ignore
import { renderToReadableStream } from "next/dist/compiled/react-server-dom-webpack/server.edge";

export async function POST(request: NextRequest) {
  const props = await request.json();
  const path = request.nextUrl.searchParams.get("path");

  if (!path) throw new Error("Path is required");

  // including layout.tsx in the bundle would cause issues
  // as webpack will include it and this file will be exporting
  // "metadata" which is not allowed
  const Component = await import(
    /* webpackExclude: /layout.(j|t)sx?/ */ "../" + path.replace("@/", "")
  ).then((module) => module.default);

  return new Response(
    renderToReadableStream(React.createElement(Component, props))
  );
}
