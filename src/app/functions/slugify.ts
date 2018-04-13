/**
 * Returns the given text in slug form.
 * @param text string The text you want to slugify.
 */
export function slugify(text): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
