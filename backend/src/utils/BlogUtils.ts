export function generateSlug(title: string): string {
    const base = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    return `${base}-${Date.now().toString(36)}`;
};

export function extractText(node: Record<string, unknown>): string {
    if (node.type === "text" && typeof node.text === "string") {
        return node.text;
    }

    if (Array.isArray(node.content)) {
        return node.content.map((child: Record<string, unknown>) => extractText(child)).join(" ");
    }

    return "";
}