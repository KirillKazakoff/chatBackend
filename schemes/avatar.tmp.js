/* eslint-disable import/prefer-default-export */
const userT = (userName) => ({
    block: 'li',
    cls: 'user-container',
    content: [{
        block: 'div',
        cls: 'round',
        content: '',
    }, {
        block: 'span',
        cls: 'user-name',
        content: userName,
    }],
});

export default userT;
