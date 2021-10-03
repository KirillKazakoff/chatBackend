import Router from 'koa-router';
import db from '../../db/db';

import engine from '../../lib/engine/engine';
import { personalMesT } from '../../schemes/messages.tmp';

const router = new Router();

router.post('/user/sendMes', async (ctx) => {
    const { body } = ctx.request;

    db.addMessage(body);
    const html = engine(personalMesT(body));

    ctx.response.body = html;
});

export default router;
