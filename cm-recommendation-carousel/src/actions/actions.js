import rp from 'request-promise';
const URL = 'http://54.191.197.111';

const getItems = (amt, seen, callback) => {
    let queryString = '',
        seenItems = [];

    if (amt) {
        queryString += `amt=${amt}&`;
    }

    if (seen && seen.length) {
        seenItems = seen.map((recommendation) => {
            return `seen=${recommendation.id}`;
        }).join('&')

        queryString += seenItems
    }

    return rp.get({
        uri: `${URL}/users/1234/items?${queryString}`,
        json: true
    }).then((res) => {
        return (typeof callback === 'function' && callback(res)) || res
    }).catch((err) => {
        return err;
    })
}

export {
    getItems
}