class SPA {

    constructor(route) {
        this.content = document.querySelector('div.content')
        this.loading = document.querySelector('div.loading').classList
        this.Model = new Model()
        this.view = new View()
        this.controller = new Controller(this.Model)

        window.addEventListener('hashchange', () => {
            this.loadingStart()
            this.Model.dataBind = {}
            let page = `${window.location.hash.slice(1).split('?')[0]}`
            document.body.id = page
            this.controller[page]()
                    .then(() => {
                        this.renderContent(this.view[page]).bindModelText().parseEvents().twoWayFormBind().loadingEnd().cleanNavLinks()
                    })
                    .catch(err => {
                        console.error(err)
                        this.renderContent(this.Model.escapeHTML(err)).loadingEnd().cleanNavLinks()
                    })
            window.location.href.replace(window.location.search, '');
        })

        if (!window.location.hash && typeof route === 'string') {
            window.location.hash = route
        }
        window.dispatchEvent(new HashChangeEvent('hashchange'))
    }

    loadingStart() {
        this.loading.add('visible')
        return this
    }

    loadingEnd() {
        this.loading.remove('visible')
        return this
    }

    renderContent(html) {
        this.content.innerHTML = html
        return this
    }

    update(evt, funcName) {
        this.Model[funcName](evt).then(() => {
            this.bindModelText().parseEvents().twoWayFormBind()
        })
    }

    cleanNavLinks() {
        let links = document.querySelector('nav').querySelectorAll('a')
        links.forEach(link => {
            link.setAttribute('href', `${link.origin}${link.hash}`)
        })
        return this
    }

    parseEvents() {
        let contents = this.content.querySelectorAll('*[data-event]')
        contents.forEach(domElem => {
            const [evtName, funcName] = domElem.dataset.event.split(':')
            domElem.addEventListener(evtName, evt => {
                return this.update(evt, funcName)
            })
            delete domElem.dataset.event
        })
        return this
    }

    twoWayFormBind() {
        let form = this.content.querySelector('form[data-bindall]')
        if (form) {
            form.addEventListener('change', (event) => {
                const target = event.target
                const property = target.name
                if (property && target.matches('input, select, textarea')) {
                    this.Model.dataBind[property] = target.value
                }
            })
            delete form.dataset.bindall
        }
        return this
    }

    bindModelText() {
        let contents = this.content.querySelectorAll('*[data-bindtext], input[name], select[name], textarea[name]')
        const obj = this.Model.dataBind
        if (contents) {
            contents.forEach(domElem => {
                const property = domElem.name || domElem.dataset.bindtext
                const selector = `*[data-bindText="${property}"], input[name="${property}"], select[name="${property}"], textarea[name="${property}"]`
                let val, safeVal
                const useSafeHTML = domElem.hasAttribute('data-safe')
                if (obj[property]) {
                    val = obj[property]
                    safeVal = this.Model.escapeHTML(val)
                    if ('value' in domElem) domElem.value = useSafeHTML ? safeVal : val
                    else if ('innerHTML' in domElem) domElem.innerHTML = useSafeHTML ? safeVal : val
                }
                Object.defineProperty(obj, property, {
                    get: () => {
                        return val
                    },
                    set: (newValue) => {
                        let elems = document.querySelectorAll(selector)
                        val = newValue
                        safeVal = this.Model.escapeHTML(val)
                        if (elems) {
                            elems.forEach(elem => {
                                if ('value' in elem) elem.value = useSafeHTML ? safeVal : val
                                else if ('innerHTML' in elem) elem.innerHTML = useSafeHTML ? safeVal : val
                            })
                        }
                    },
                    configurable: true
                })
            })
        }
        return this
    }

}