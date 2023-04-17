import { NextRequest } from "next/server";
import React from "react";
// @ts-ignore
import { renderToReadableStream } from "next/dist/compiled/react-server-dom-webpack/server.edge";

export async function POST(request: NextRequest) {
  const props = await request.json();
  const path = request.nextUrl.searchParams.get("path");

  if (!path) throw new Error("Path is required");

  const Component = await import(
    "../components" + path.split("./components").pop()
  ).then((module) => module.default);

  return new Response(
    renderToReadableStream(React.createElement(Component, props))
  );
}
