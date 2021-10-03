/* eslint-disable object-curly-newline */
function generateHtml(block, cls, content, attrs) {
    if (block === 'input' || block === 'img') {
        return `<${block} ${attrs}${cls}>`;
    }
    return `<${block} ${attrs}${cls}>${content}</${block}>`;
}

export default function engine(node) {
    if (!node) return '';

    if (typeof node === 'string') {
        return node;
    }

    if (Array.isArray(node)) {
        let fragment = '';

        node.forEach((b) => {
            const htmlElement = engine(b);
            fragment += htmlElement;
        });

        return fragment;
    }

    const { block, cls, content, attrs } = node;
    let htmlAttrs = '';
    let htmlCls = '';

    if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'novalidate' || key === 'required') {
                htmlAttrs += `${key} `;
            } else {
                htmlAttrs += `${key}="${value}"`;
            }
        });
    }

    if (cls) {
        htmlCls = `class="${cls}"`;
    }

    const htmlContent = engine(content);
    const htmlElement = generateHtml(block, htmlCls, htmlContent, htmlAttrs);

    return htmlElement;
}
