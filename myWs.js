/* eslint-disable class-methods-use-this */
import { nanoid } from 'nanoid';
import WS from 'ws';
import db from './db/db';

export default class MyWs {
    constructor(server) {
        this.wsServer = new WS.Server({ server });
        this.clients = [];
        this.wsServer.on('connection', (ws) => this.onConnection(ws));
    }

    addClient(ws) {
        const wsInstance = {
            id: nanoid(5),
            ws,
        };

        this.clients.push(wsInstance);
        return wsInstance;
    }

    onConnection(ws) {
        const errCallback = (e) => console.log(e);

        const wsInstance = this.addClient(ws);
        this.addMsgListener(wsInstance);

        const connectData = {
            messages: db.getHtmlAll(),
            avatars: db.getAvatars(),
        };
        ws.send(JSON.stringify(connectData), errCallback);
    }

    addMsgListener(wsInstance) {
        wsInstance.ws.on('message', (e) => {
            this.activeWs = wsInstance;
            const msg = JSON.parse(e);

            let response = null;

            if (msg.message) {
                response = JSON.stringify({
                    msgHtml: db.getHtmlMes(msg),
                    userName: msg.name,
                });
            }

            if (msg.login) {
                response = JSON.stringify({
                    usrHtml: db.getAvatar(msg.login),
                    userName: msg.name,
                });
                this.activeWs.ws.send(JSON.stringify({
                    usrHtml: db.getAvatar('You'),
                    userName: msg.name,
                }));
            }

            this.sendToClients(response);
        });
    }

    sendToClients(response) {
        const readyClients = this.clients.filter((client) => {
            const checkOpen = client.ws.readyState === WS.OPEN;
            const checkCurrent = client.id !== this.activeWs.id;

            return checkOpen && checkCurrent;
        });

        readyClients.forEach((client) => client.ws.send(response));
    }
}