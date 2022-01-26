import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  // ScrollRestoration,
  useCatch,
  LinksFunction,
} from "remix";
import type { MetaFunction } from "remix";

import bulmaStyles from "bulma/css/bulma.min.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: bulmaStyles,
    },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "Purjehtijat.fi" };
};

function Document({
  children,
  title = `Purjehtijat.fi`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  // TODO: Support bulma here

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}
