/* eslint-disable import/prefer-default-export */
import { DateTime } from 'luxon';

export function getTime() {
    return DateTime.now().toFormat('dd.LL.yyyy, HH:mm');
}
