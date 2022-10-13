import Router from 'koa-router';

import db from '../../db/db';

const router = new Router();

router.post('/user/login', async (ctx) => {
    const { user } = ctx.request.body;

    if (db.contains(user)) {
        ctx.response.status = 400;
        ctx.response.body = { status: 'Уже зарегистрирован пользователь с таким именем' };
        return;
    }

    db.addUser(user);
    ctx.response.body = { status: 'ok' };
});

export default router;
