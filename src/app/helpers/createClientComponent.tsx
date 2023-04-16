import { cache, use, useEffect, useState } from "react";
// @ts-ignore
import { createFromFetch } from "next/dist/compiled/react-server-dom-webpack/client.browser";

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

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableArray
  | SerializableObject;

interface SerializableArray extends Array<SerializableValue> {}

interface SerializableObject extends Record<string, SerializableValue> {}

export function createClientComponent<
  Props extends SerializableObject
>(ServerComponent: {
  (props: Props): JSX.Element | Promise<JSX.Element>;
  url: string;
}) {
  const ClientComponent = (props: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const serializedProps = JSON.stringify(props);
    return use(fetchComponent(ServerComponent.url, serializedProps));
  };
  return ClientComponent;
}
