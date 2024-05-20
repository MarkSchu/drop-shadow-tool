function addAttrs(el, attrs) {
    for (const attr in attrs) {
        switch (attr) {
            case 'onclick':
            case 'textContent':
                el[attr] = attrs[attr];
                break;
            default:
                el.setAttribute(attr, attrs[attr]);
        }
    }
}

export function svg(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    addAttrs(el, attrs);
    const children = Array.from(arguments).slice(2).flat();
    children.forEach((child) => {
        el.appendChild(child);
    });
    return el;
}