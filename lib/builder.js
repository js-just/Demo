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

const monaco_version = '0.52.2';

const Builder = () => {
    const translate = useTranslations();

    return (
        <>
            <div>
                <span>{translate.raw('builder-file')}</span>
                <div id="monaco" />
            </div>
            <Script id="monaco-editor">
                {`
                    var require = { paths: { 'vs': 'third-party/monaco-editor/package/min/vs' } };
                `}
            </Script>
            <script src={`/third-party/monaco-editor/${monaco_version}/package/min/vs/loader.js`}></script>
            <script src={`/third-party/monaco-editor/${monaco_version}/package/min/vs/editor/editor.main.nls.js`}></script>
            <script src={`/third-party/monaco-editor/${monaco_version}/package/min/vs/editor/editor.main.js`}></script>
            <Script id="builder">
                {`
                    var h_div = document.getElementById('monaco');
                    var editor = monaco.editor.create(h_div, {
                        value: [
                            'function x() {',
                            '\\tconsole.log("Hello world!");',
                            '}'
                        ].join('\\n'),
                        language: 'javascript'
                    });
                `}
            </Script>
        </>
    )
}

export default Builder;
