function getAspectRatio(w, h) {
    const result = w/h;
    return Math.round((result + Number.EPSILON) * 100) / 100;
}

function genHeight(w, aspectRation) {
    return w * aspectRation;
}

function generateViewBox(w, h) {
    return `0 0 ${w} ${h}`;
}

function getRandomArbitrary( max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloat( max, min = 0) {
    return Math.random() * (max - min) + min;
}

function getRelativeValue(value, dist = 10) {
    const delta = value * dist / 100;
    return getRandomArbitrary(value - delta, value + delta)
}

function generateRandomColor(isGrayScale = false) {
    return isGrayScale ? `hsla(360, 0%, ${getRandomArbitrary(100, 50)}%, 1)` : `hsla(${getRandomArbitrary(360)}, 100%, 85%, 1)`;
}

function getRandomStroke() {
    return getRandomArbitrary(5, 1);
}

function randomOrTransparent(isGrayscale) {
    return getRandomFloat(1)  > 0.5 ? generateRandomColor(isGrayscale) : 'transparent';
}

function generatePathForTriangle(x,y,size) {
    const halfSize = Math.round(size/2)
    return `${x},${y-halfSize},${x-halfSize},${y+halfSize},${x+halfSize},${y+halfSize}`
}

function process(str) {
    if (!str) {
        return;
    }
    let div = document.createElement('div');
    div.innerHTML = str.trim();

    return format(div, 0).innerHTML.replace(/<!--.*?-->/g, "");
}

function format(node, level = 0) {
    console.log(node);

    let indentBefore = new Array(level++ + 1).join('  '),
        indentAfter  = new Array(level - 1).join('  '),
        textNode;

    for (let i = 0; i < node.children.length; i++) {

        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild === node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}

export {
    getAspectRatio,
    generateViewBox,
    generateRandomColor,
    getRandomStroke,
    getRandomArbitrary,
    randomOrTransparent,
    genHeight,
    getRelativeValue,
    generatePathForTriangle,
    process,
}
