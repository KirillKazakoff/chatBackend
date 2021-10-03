import combineRouters from 'koa-combine-routers';

import pingRouter from './ping/ping';
import loginRouter from './user/login';
import messageRouter from './user/chat';

const router = combineRouters(
    pingRouter,
    loginRouter,
    messageRouter,
);

export default router;
