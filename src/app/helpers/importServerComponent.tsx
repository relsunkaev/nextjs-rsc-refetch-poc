import { cache, use, useEffect, useState } from "react";
// @ts-ignore
import { createFromFetch } from "next/dist/compiled/react-server-dom-webpack/client.browser";
import { dirname, join } from "path";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.API_URL) return `https://${process.env.API_URL}`; // SSR should use api url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const fetchComponent = cache(
  (path: string, props: string): Promise<JSX.Element> =>
    createFromFetch(
      fetch(getBaseUrl() + "/rsc?" + new URLSearchParams({ path }), {
        method: "POST",
        body: props,
      })
    )
);

function getCallerPath() {
  try {
    throw Error();
  } catch (error) {
    return (
      "." +
      (error as Error).stack
        ?.split("\n")[3] // 0 is Error, 1 is getCallerPath, 2 is the call site, 3 is the caller
        .split(")/")[1] // remove webpack prefix
        .split(":")[0] // remove line number
        .split("app") // remove app prefix
        .pop()
    );
  }
}

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableArray
  | SerializableObject;

interface SerializableArray extends Array<SerializableValue> {}

interface SerializableObject extends Record<string, SerializableValue> {}

export function importServerComponent<Props extends SerializableObject>(
  path: string
) {
  const rootPath = join(dirname(getCallerPath()), path);
  const ClientComponent = (props: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const serializedProps = JSON.stringify(props);
    return use(fetchComponent(rootPath, serializedProps));
  };
  return ClientComponent;
}
