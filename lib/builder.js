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

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Select from './ui/select.js';

const Builder = () => {
    const translate = useTranslations();
    const router = useRouter();

    const [language, setLanguage] = useState('javascript');
    const randomType = ["redirect", "compress", "docs"];

    const [editorID, setEditorID] = useState(0);
    const createEditor = (h_div, value, language) => {
        var editor = monaco.editor.create(h_div, {
            value,
            language,
            fontFamily: "'Source Code Pro', Consolas, 'Courier New', monospace",
            fontSize: 15
        });
        editor.updateOptions({fontSize: 14});
        setEditorID(monaco.editor.getEditors().indexOf(editor) || 0);
        return editor;
    }
    useEffect(() => {
        var h_div = document.getElementById('monaco');
        var editor = createEditor(h_div, [
            'module.exports = {',
            `\ttype: "${randomType[Math.floor(Math.random() * randomType.length)]}"`,
            '}'
        ].join('\n'), language);
        window.addEventListener('resize', () => {
            editor.layout();
        });
    }, []);
    useEffect(() => {
        monaco.editor.getEditors()[editorID].updateOptions({
            language
        });
        return () => {
            monaco.editor.getEditors()[editorID].updateOptions({
                language
            });
        }
    }, [language]);

    return (
        <>
            <script src="/fix/fetch.js"></script>
            <div className='builder'>
                <div>
                    <span>{translate.raw('builder-file')}</span>
                    <input id='builder-filepath' placeholder='index' value="just.config.js" data-value="just" />
                </div>
                <noscript>
                    <span>{translate.raw('builder-filecontent')}</span>
                </noscript>
                <div id="monaco" />
                <div className='aic'>
                    <span>{translate.raw('builder-filelanguage')}</span>
                    <Select 
                        titles={[translate.raw('builder-langdropup-collapsed'), translate.raw('builder-langdropup-expanded'), translate.raw('builder-langdropup-switchToLang')]} 
                        items={[['JavaScript', '/img/js.svg', 'javascript'], ['HTML', '/img/html.svg', 'html']]} 
                        variable="l"
                        setVar={setLanguage}
                        addItemNameToTitles2={true}
                    />
                </div>
            </div>
            <script src="/third-party/monaco-editor/package/min/vs/loader.js"></script>
            <script src="/third-party/monaco-editor/package/min/vs/editor/editor.main.js"></script>
            <script src="/third-party/monaco-editor/package/min/vs/language/typescript/tsWorker.js"></script>
        </>
    )
}

export default Builder;
