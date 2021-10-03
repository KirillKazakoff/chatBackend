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

    removeUser(name) {
        const index = this.users.findIndex((usrN) => usrN === name);
        this.users.splice(index, 1);
    }

    contains(userName) {
        return this.users.some((name) => name === userName);
    }

    getHtmlAll() {
        return this.messages.map(this.getHtmlMes);
    }

    getHtmlPers(mes) {
        return engine(personalMesT(mes));
    }

    getHtmlMes(mes) {
        return engine(mesT(mes));
    }

    getAvatar(userName) {
        return {
            usrHtml: engine(userT(userName)),
            userName,
        };
    }

    getAvatars() {
        return this.users.map(this.getAvatar);
    }
}

const db = new Db();
export default db;
