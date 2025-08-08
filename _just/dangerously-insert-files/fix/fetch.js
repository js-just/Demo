/*

MIT License

Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var require = { paths: { 'vs': 'third-party/monaco-editor/package/min/vs' } };
const originalFetch = window.fetch;
window.fetch = function(input, init) {
    let url;
    if (typeof input === 'string') {
        url = input;
    } else if (input instanceof Request) {
        url = input.url;
    } else {
        return originalFetch(input, init);
    }

    try {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname;

        if (path.startsWith('/vs')) {
            const newPath = `/third-party/monaco-editor/package/min${path}`;
            return originalFetch(newPath, init);
        }
    } catch (e) {
        if (url.startsWith('vs')) {
            const newPath = `/third-party/monaco-editor/package/min/${url}`;
            return originalFetch(newPath, init);
        } else if (url.startsWith('/vs')) {
            const newPath = `/third-party/monaco-editor/package/min${url}`;
            return originalFetch(newPath, init);
        } else if (url.startsWith('../../../vs')) {
            const newPath = `/third-party/monaco-editor/package/min${url.slice(8)}`;
            return originalFetch(newPath, init);
        } else {
            return originalFetch(input, init);
        }
    }

    return originalFetch(input, init);
};
