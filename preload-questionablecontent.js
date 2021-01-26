/**
 * Content script.
 * Adds a <link rel=preload> for the next Questionable Content comic image.
 * (Semantically, I think prefetch would be more correct than preload,
 * but prefetch didn’t seem to have an effect,
 * and this is just a private extension anyways.)
 */

'use strict';

const url = new URL(document.location);
let comic;
if (url.pathname === '/view.php'
    && (comic = url.searchParams.get('comic')) !== null
    && !isNaN(comic = parseInt(comic, 10))) {
    const link = document.createElement('link');
    link.href = new URL(`/comics/${comic + 1}.png`, url);
    link.rel = 'preload';
    link.as = 'image';
    document.head.appendChild(link);
}
