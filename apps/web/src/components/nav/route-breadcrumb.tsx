import { Link, useMatches } from "@tanstack/react-router";
import React from "react";
import { formatBreadcrumbText } from "@/utils/routeFormat";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";

const RouteBreadcrumb = () => {
    const matches = useMatches();

    const breadcrumbs = matches.filter(
        (match) => match.id !== "__root__" && match.pathname !== "/"
    );

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {breadcrumbs.map((match, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    // Get the specific segment for this route
                    const pathSegments = match.pathname.split("/");
                    const segment = pathSegments.at(-1) ?? "";

                    // 2. Custom Logic: Rename 'dashboard' to 'Home'
                    let label = formatBreadcrumbText(segment);
                    if (segment.toLowerCase() === "dashboard") {
                        label = "Home";
                    }

                    return (
                        <React.Fragment key={match.id}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            className="transition-colors hover:text-foreground"
                                            to={match.pathname}
                                        >
                                            {label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {/* Add separator if it's not the last item */}
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default RouteBreadcrumb;
