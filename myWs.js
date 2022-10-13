/* eslint-disable no-param-reassign */
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
        const wsInstance = this.addClient(ws);
        this.addMsgListener(wsInstance);
        this.addCloseListener(wsInstance);
    }

    addMsgListener(wsInstance) {
        wsInstance.ws.on('message', (e) => {
            this.currentWs = wsInstance;
            const msg = JSON.parse(e);

            let responseToOtherClients = null;

            if (msg.message) {
                responseToOtherClients = JSON.stringify({
                    msgHtml: db.getHtmlMes(msg),
                    userName: msg.name,
                });
            }

            if (msg.login) {
                wsInstance.userName = msg.login;

                responseToOtherClients = JSON.stringify({
                    avatar: db.getAvatar(msg.login),
                    newParticipant: msg.login,
                });

                wsInstance.ws.send(
                    JSON.stringify({
                        avatars: db.getAvatars(msg.login),
                        login: msg.login,
                        messages: db.getHtmlMesAll(msg.login),
                    }),
                );
            }

            this.sendToClients(responseToOtherClients);
        });
    }

    addCloseListener(wsInstance) {
        wsInstance.ws.on('close', () => {
            this.currentWs = wsInstance;
            db.removeUser(wsInstance.userName);

            const response = JSON.stringify({
                delUsrName: wsInstance.userName,
            });
            this.sendToClients(response);
        });
    }

    getClientsExceptCurrent() {
        return this.clients.filter((client) => {
            const checkOpen = client.ws.readyState === WS.OPEN;
            const checkCurrent = client.id !== this.currentWs.id;

            return checkOpen && checkCurrent;
        });
    }

    sendToClients(response) {
        const readyClients = this.getClientsExceptCurrent();
        readyClients.forEach((client) => client.ws.send(response));
    }
}
