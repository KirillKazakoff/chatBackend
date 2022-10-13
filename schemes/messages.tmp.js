const headerDataT = () => ({
    block: 'span',
    cls: 'message__header-data',
    content: '',
});

const headerNameT = (name) => ({
    block: 'span',
    cls: 'message__header-name',
    content: `${name},`,
});

const headerT = (name) => ({
    block: 'header',
    cls: 'message__header',
    content: [headerNameT(name), headerDataT()],
});

const contentT = (message) => ({
    block: 'div',
    cls: 'message__content',
    content: message,
});

export const mesT = (mesData) => ({
    block: 'li',
    cls: 'message',
    content: [headerT(mesData.name), contentT(mesData.message)],
});

export const personalMesT = (mesData) => ({
    block: 'li',
    cls: 'message message--you',
    content: [headerT('You'), contentT(mesData.message)],
});
