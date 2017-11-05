class BaseModel {

    constructor() {
        this.APIS = {}
        this.dataBind = {}

        this.http = {
            get: (url) => {
                return this.httpFetch(url, null, 'GET').then(response => response.json())
            },
            post: (url, data) => {
                return this.httpFetch(url, data, 'POST').then(response => response.json())
            },
            put: (url, data) => {
                return this.httpFetch(url, data, 'PUT').then(response => response.json())
            },
            delete: (url) => {
                return this.httpFetch(url, null, 'DELETE')
            }
        }
    }

    escapeHTML(html) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(html));
        return div.innerHTML;
    }

    httpFetch(url, data, verb) {
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json')
        let myInit = {method: verb, headers: myHeaders, mode: 'cors', cache: 'default'}
        if (data) {
            myInit.body = JSON.stringify(data)
        }
        const myRequest = new Request(url, myInit)
        return fetch(myRequest)
                .then(response => {
                    if (!response.ok)
                        throw Error(response.statusText)
                    return response
                })
    }

    generateUrlParams(params = {}) {
        const esc = encodeURIComponent
        return `?${Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&')}`
    }

    urlParams() {
        return new URLSearchParams(window.location.search)
    }

}