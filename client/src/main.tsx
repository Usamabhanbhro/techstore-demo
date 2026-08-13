/* Usamabhanbhro Material Quiet entrypoint: tactile editorial commerce, explicit demo states, and restrained motion. */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import ReactDOM from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { resolveTrpcUrl, restorePagesDeepLink } from "./lib/pagesRouting";
import { trpc } from "./lib/trpc";
import "./index.css";
import "./usamabhanbhro-overrides.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
});

const pagesDeepLink = restorePagesDeepLink(window.location.search, import.meta.env.BASE_URL);
if (pagesDeepLink) window.history.replaceState(null, "", pagesDeepLink);

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: resolveTrpcUrl(import.meta.env.VITE_API_URL),
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, { ...options, credentials: "include" });
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>,
);
