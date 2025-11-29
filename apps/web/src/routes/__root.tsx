import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import type { orpc } from "@/utils/orpc";
import "../index.css";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ThemeProvider } from "next-themes";

export type RouterAppContext = {
    orpc: typeof orpc;
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
    component: RootComponent,
    head: () => ({
        meta: [
            {
                title: "INVENEASE",
            },
            {
                name: "description",
                content: "INVENEASE is a web application",
            },
        ],
        links: [
            {
                rel: "icon",
                href: "/favicon.ico",
            },
        ],
    }),
});

function RootComponent() {
    return (
        <>
            <HeadContent />
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
                storageKey="vite-ui-theme"
            >
                <div className="h-svh bg-background">
                    <Outlet />
                </div>
                <Toaster position="top-right" richColors />
            </ThemeProvider>
            {import.meta.env.DEV && (
                <TanStackDevtools
                    plugins={[
                        {
                            name: "TanStack Query",
                            render: <ReactQueryDevtoolsPanel />,
                            defaultOpen: true,
                        },
                        {
                            name: "TanStack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                            defaultOpen: false,
                        },
                    ]}
                />
            )}
        </>
    );
}
