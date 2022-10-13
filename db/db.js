/* eslint-disable class-methods-use-this */
import engine from '../lib/engine/engine';
import { mesT, personalMesT } from '../schemes/messages.tmp';
import userT from '../schemes/avatar.tmp';

class Db {
    constructor() {
        this.users = [];
        this.messages = [];
    }

    addMessage(msgObj) {
        this.messages.push(msgObj);
    }

    addUser(user) {
        this.users.push(user);
    }

    contains(userName) {
        return this.users.some((name) => name === userName);
    }

    removeUser(userName) {
        const index = this.users.findIndex((usrN) => usrN === userName);
        this.users.splice(index, 1);
    }

    getHtmlMes(mes) {
        return engine(mesT(mes));
    }

    getHtmlMesPers(mes) {
        return engine(personalMesT(mes));
    }

    getHtmlMesAll(userName) {
        return this.messages.map((message) => {
            if (message.name === userName) return this.getHtmlMesPers(message);
            return this.getHtmlMes(message);
        });
    }

    getAvatar(userName) {
        return {
            usrHtml: engine(userT(userName)),
            userName,
        };
    }

    getAvatars(login) {
        return this.users.map((user) => {
            if (user === login) return this.getAvatar('You');
            return this.getAvatar(user);
        });
    }
}

const db = new Db();
export default db;
