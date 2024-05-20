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
        element('div', {},
            element('label', {textContent: label}),
            element('input', {
                type: 'color', 
                value, 
                oninput
            }),
            element('span', {textContent: value})
        )
    )
}

function RangeInput({label, value, handler}) {

    const oninput = (e) => {
        const value = e.target.value;
        e.target.nextElementSibling.textContent = value;
        handler(value);
    }

    return (
        element('div', {},
            element('label', {textContent: label}),
            element('input', {
                type: 'range', 
                value, 
                min: 0, 
                max: 400, 
                oninput
            }),
            element('span', {textContent: value})
        )
    )
}

function Display(circle) {
    return (
        svg('svg', {
            // viewBox: '-400 -400 800 800', 
            // width: '400', 
            // height: '400',
            // viewBox: '-400 -400 800 800', 
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
            ColorInput({
                label: 'Background Color: ', 
                value: document.body.style.backgroundColor,
                handler: (value) => { document.body.style.backgroundColor = value; }
            }),
            ColorInput({
                label: 'Circle Color: ', 
                value: circle.fill,
                handler: (value) => { circle.setAttribute('fill', value) }
            }),
            RangeInput({
                label: 'Circle Size: ', 
                value: circle.r,
                handler: (value) => { circle.setAttribute('r', value) }
            }),
            ColorInput({
                label: 'Dropshadow Color: ', 
                value: dropShadow.color,
                handler: (value) => { updateDropshadow('color', value) }
            }),
            RangeInput({
                label: 'Dropsahdow X Offset: ', 
                value: dropShadow.xOffset,
                handler: (value) => { updateDropshadow('xOffset', value) }
            }),
            RangeInput({
                label: 'Dropsahdow Y Offset: ', 
                value: dropShadow.yOffset,
                handler: (value) => { updateDropshadow('yOffset', value) }
            }),
            RangeInput({
                label: 'Dropsahdow Blur: ', 
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
