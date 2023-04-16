import { NextRequest } from "next/server";
import { relative } from "path";
import React from "react";
// @ts-ignore
import { renderToReadableStream } from "next/dist/compiled/react-server-dom-webpack/server.edge";

export async function POST(request: NextRequest) {
  const props = await request.json();
  const path = request.nextUrl.searchParams.get("path");

  if (!path) throw new Error("Path is required");

  const Component = await import(
    "../components/" +
      relative(import.meta.url, path)
        .split("/")
        .slice(3)
        .join("/")
        .replace(/\.\w$/, "")
  ).then((module) => module.default);

  return new Response(
    renderToReadableStream(React.createElement(Component, props))
  );
}
