class BaseModel {

    constructor() {
        this.APIS = {}
        this._Model = {}
        
        Object.getOwnPropertyNames(Object.getPrototypeOf(new Controller))
                .filter(page => page !== 'constructor')
                .forEach(page => {
                    this._Model[page] = {}
                })

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
    
    get dataBindModel() {
        return this._Model[this.page]
    }
    
    set dataBindModel(model) {
        Object.assign(this._Model[this.page], model)
        return this
    }
    
    clearDataBindModel() {
        this._Model[this.page] = {}
        return this
    }
    
    get page() {
        return window.location.hash.slice(1).split('?')[0]
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
        return `?${Object.keys(params).map(k => [k, params[k]].map(window.encodeURIComponent).join('=')).join('&')}`
    }

    urlParams() {
        return new URLSearchParams(window.location.search)
    }

}