export function formatBreadcrumbText(segment: string) {
    const spaced = segment.replace(/[-_]/g, " ");
    return spaced.replace(/\b\w/g, (char) => char.toUpperCase());
}
