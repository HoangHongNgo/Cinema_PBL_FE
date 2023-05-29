import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { AppProvider } from "./contexts/app.context";
import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppProvider>

  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </AppProvider>
  // </React.StrictMode>
);
