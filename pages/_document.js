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

import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import useMonacoVersion, { defaultMonacoVersion } from '@/lib/monacoversion';
import { useRouter } from 'next/router';
class CustomDocument extends Document {
    render() {
        const router = useRouter();
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@100..900&family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
                    <title>Just an Ultimate Site Tool Demo</title>
                    <link rel="stylesheet" data-name="vs/editor/editor.main" href={`/third-party/monaco-editor/${useMonacoVersion(router.asPath) || defaultMonacoVersion}/package/min/vs/editor/editor.main.css`} />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                    <Script id="noselect">
                        {`
                            document.ondragstart=noselect;document.onselectstart=noselect;document.oncontextmenu=noselect;function noselect(){return false;}
                        `}
                    </Script>
                </body>
            </Html>
        )
    }
}
export default CustomDocument;