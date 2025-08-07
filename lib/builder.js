/*

MIT License

Copyright (c) 2025 JustStudio <https://juststudio.is-a.dev/>

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

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Select from './ui/select.js';

const Builder = () => {
    const translate = useTranslations();
    const router = useRouter();

    const randomType = ["redirect", "compress", "docs"];

    return (
        <>
            <div className='builder'>
                <div><span>{translate.raw('builder-file')}</span><input id='builder-filepath' placeholder='index' value="just.config.js" data-value="just" /></div>
                <noscript><span>{translate.raw('builder-filecontent')}</span></noscript>
                <div id="monaco" />
                <div className='aic'><span>{translate.raw('builder-filetype')}</span><Select placeholder={translate.raw('builder-language')} items={[['JavaScript', '/img/js.svg']]} /></div>
            </div>
            <Script id="rewrite-fetch">
                {`
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
                                const newPath = \`/third-party/monaco-editor/package/min\${path}\`;
                                return originalFetch(newPath, init);
                            }
                        } catch (e) {
                            if (url.startsWith('vs')) {
                                const newPath = \`/third-party/monaco-editor/package/min/\${url}\`;
                                return originalFetch(newPath, init);
                            } else if (url.startsWith('/vs')) {
                                const newPath = \`/third-party/monaco-editor/package/min\${url}\`;
                                return originalFetch(newPath, init);
                            } else if (url.startsWith('../../../vs')) {
                                const newPath = \`/third-party/monaco-editor/package/min\${url.slice(8)}\`;
                                return originalFetch(newPath, init);
                            } else {
                                return originalFetch(input, init);
                            }
                        }

                        return originalFetch(input, init);
                    };
                `}
            </Script>
            <script src="/third-party/monaco-editor/package/min/vs/loader.js"></script>
            <script src="/third-party/monaco-editor/package/min/vs/editor/editor.main.js"></script>
            <Script id="builder" strategy="afterInteractive">
                {`
                    var h_div = document.getElementById('monaco');
                    const defwidth = window.innerWidth;
                    window.addEventListener('resize', () => {
                        if (defwidth > window.innerWidth) {
                            window.location.reload();
                        }
                    });
                    var editor = monaco.editor.create(h_div, {
                        value: [
                            'module.exports = {',
                            '\\ttype: "${randomType[Math.floor(Math.random() * randomType.length)]}"',
                            '}'
                        ].join('\\n'),
                        language: 'javascript',
                        fontFamily: "'Source Code Pro', Consolas, 'Courier New', monospace",
                        fontSize: 15
                    });
                `}
            </Script>
        </>
    )
}

export default Builder;
