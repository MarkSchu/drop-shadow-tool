import { element, render } from 'utils/dom.js';
import { svg } from 'utils/svg.js';

const getDropshadowStr = (dropShadow) => {
    const { color, xOffset, yOffset, blur } = dropShadow;
    return `drop-shadow(${color} ${xOffset} ${yOffset} ${blur})`;
}

function ColorInput({label, value, handler}) {

    const oninput = (e) => {
        const value = e.target.value;
        e.target.nextElementSibling.textContent = value;
        handler(value);
    }

    return (
        element('div', {className: 'control'},
            element('label', {textContent: label}),
            element('input', {
                type: 'color', 
                value, 
                oninput
            }),
            element('div', {textContent: value})
        )
    )
}

function RangeInput({label, value, handler}) {
    
    const oninput = (e) => {
        const value = e.target.value;
        e.target.nextElementSibling.textContent = value.animVal ? value.animVal.value : value;
        handler(value);
    }

    return (
        element('div', {className: 'control'},
            element('label', {textContent: label}),
            element('input', {
                type: 'range', 
                value, 
                min: 0, 
                max: 400, 
                oninput
            }),
            element('div', {textContent: value})
        )
    )
}

function Display(circle) {
    return (
        svg('svg', {
            viewBox: '-400 -400 800 800', 
            width: '100%', 
            height: '100%'
            
        },
            circle
        )
    )
}

function Controls(dropShadow, circle) {

    const updateDropshadow = (prop, value) => {
        dropShadow[prop] = value;
        circle.setAttribute('filter', getDropshadowStr(dropShadow));
    }
    
    return (
        element('div', {className: 'controls'},
            element('h4', {textContent: 'Background'}),
            ColorInput({
                label: 'color: ', 
                value: '#000000',   // hardcode to get hex
                handler: (value) => { document.body.style.backgroundColor = value; }
            }),
            element('h4', {textContent: 'Circle'}),
            ColorInput({
                label: 'color: ', 
                value: circle.getAttribute('fill'),
                handler: (value) => { circle.setAttribute('fill', value) }
            }),
            RangeInput({
                label: 'size: ', 
                value: circle.getAttribute('r'),
                handler: (value) => { circle.setAttribute('r', value) }
            }),
            element('h4', {textContent: 'Dropshadow'}),
            ColorInput({
                label: 'color: ', 
                value: dropShadow.color,
                handler: (value) => { updateDropshadow('color', value) }
            }),
            RangeInput({
                label: 'x offset: ', 
                value: dropShadow.xOffset,
                handler: (value) => { updateDropshadow('xOffset', value) }
            }),
            RangeInput({
                label: 'y offset: ', 
                value: dropShadow.yOffset,
                handler: (value) => { updateDropshadow('yOffset', value) }
            }),
            RangeInput({
                label: 'blur: ', 
                value: dropShadow.blur,
                handler: (value) => { updateDropshadow('blur', value) }
            }),
        )
    )
}

function App() {

    document.body.style.backgroundColor = '#000000';

    const dropShadow = {
        color: '#ffffff',
        xOffset: '0',
        yOffset: '0',
        blur: '25'
    }

    const circle = svg('circle', {
        id: 'circle',
        cx: '0', 
        cy: '0',
        r: 100, 
        fill: '#ffffff', 
        filter: getDropshadowStr(dropShadow)
    });

    return (
        element('div', {},
            Controls(dropShadow, circle),
            Display(circle)
        )
    )
}

render(document.body, App());
