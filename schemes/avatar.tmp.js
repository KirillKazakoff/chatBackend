/* eslint-disable import/prefer-default-export */
const userT = (userName) => ({
    block: 'li',
    cls: 'user',
    content: [
        {
            block: 'div',
            cls: 'user__round',
            content: '',
        },
        {
            block: 'span',
            cls: 'user__name',
            content: userName,
        },
    ],
});

export default userT;
