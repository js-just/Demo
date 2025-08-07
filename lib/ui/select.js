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

const GoogleFonts_Icons_ArrowDropUp = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" {...props}>
        <path d="M328-400q-9 0-14.5-6t-5.5-14q0-2 6-14l145-145q5-5 10-7t11-2q6 0 11 2t10 7l145 145q3 3 4.5 6.5t1.5 7.5q0 8-5.5 14t-14.5 6H328Z" />
    </svg>
);
const Img = ({ item }) => (<img src={item[1]} title={item[0]} alt="" className='fi r2px ow' />);

let selectID = 0;
const ArrowDropUp_Translate = ['none', '0px -1px'];

const Select = ({
    titles,
    items,
    variable,
    addItemNameToTitles2 = false
}) => {
    const [id, setID] = useState(0);
    const [switch_, setSwitch] = useState(false);
    const [hover, setHover] = useState(false);

    selectID++;
    useEffect(() => {
        document.body.style.setProperty(`--${variable || 'select'+selectID}`, items[id][2] || id);
        return () => {
            document.body.style.setProperty(`--${variable || 'select'+selectID}`, items[id][2] || id);
        }
    }, [id]);

    return (
        <>
            <button 
                title={switch_ ? titles[1] : titles[0]} 
                type='button' 
                className='bb cw sb scp cp t' 
                onClick={() => setSwitch(!switch_)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <GoogleFonts_Icons_ArrowDropUp id="arw" className="t" style={{
                    translate: hover ? ArrowDropUp_Translate[1] : ArrowDropUp_Translate[0], 
                    webkitTranslate: hover ? ArrowDropUp_Translate[1] : ArrowDropUp_Translate[0]
                }} />
                <Img item={items[id]} />
                {items[id][0]}
                {switch_ ? <div className='du r5px ob'>{
                    items.map((item, iid) => (
                        <button
                            key={iid}
                            title={titles[2] ? addItemNameToTitles2 ? titles[2]+item[0] : titles[2] : ''}
                            type='button' 
                            className='bb cw sb scp cp'
                            onClick={() => {
                                setID(iid);
                                setHover(false);
                            }}
                        >
                            <Img item={item} />
                            {item[0]}
                        </button>
                    ))
                }</div> : <></>}
            </button>
        </>
    )
}
export default Select;
