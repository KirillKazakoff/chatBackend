/* eslint-disable import/prefer-default-export */
import { getTime } from '../lib/utils';

const headerDataT = () => ({
    block: 'span',
    cls: 'header-data',
    content: getTime(),
});

const headerNameT = (name) => ({
    block: 'span',
    cls: 'header-name',
    content: `${name},`,
});

const headerT = (name) => ({
    block: 'header',
    cls: 'message-header',
    content: [headerNameT(name), headerDataT()],
});

const contentT = (message) => ({
    block: 'div',
    cls: 'message-content',
    content: message,
});

export const mesT = (mesData) => ({
    block: 'li',
    cls: 'message',
    content: [headerT(mesData.name), contentT(mesData.message)],
});

export const personalMesT = (mesData) => ({
    block: 'li',
    cls: 'message message__you',
    content: [headerT('You'), contentT(mesData.message)],
});
