import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		{/* 	<ReactQueryDevtools initialIsOpen={false} position="right" /> */}
		</QueryClientProvider>
	</StrictMode>
);
