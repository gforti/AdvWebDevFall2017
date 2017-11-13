class SPA {

    constructor(route) {
        this.content = document.querySelector('div.spa-content')
        this.loading = document.querySelector('div.spa-loading').classList
        this.Model = new Model()
        this.View = new View()
        this.controller = new Controller(this.Model)
        this.checkedRegex = /(radio|checkbox)/i

        window.addEventListener('hashchange', () => {
            this.loadingStart()
            let page = this.Model.page
            document.body.id = page
            this.controller[page]()
                    .then(() => {
                        return this.renderContent(this.View[page])
                    })
                    .then(() => {
                      this.bindModelText().parseEvents().twoWayInputBind().parseClassState().cleanNavLinks().loadingEnd()
                    })
                    .catch(err => {
                        console.error(err)
                        this.renderContent(window.Promise.resolve(this.Model.escapeHTML(err))).then(()=> {
                            this.cleanNavLinks().loadingEnd() 
                        })
                    })
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
        window.dispatchEvent(new CustomEvent('spaRouteReady'))
        return this
    }

    renderContent(page) {
        return page.then( html => {
            this.content.innerHTML = html
            return this
        })
    }

    update(evt, funcName) {
        return this.Model[funcName](evt).then(() => {
            return this.bindModelText().parseEvents().twoWayInputBind().parseClassState()
        })
    }

    cleanNavLinks() {
        let links = [].slice.call(document.querySelector('nav').querySelectorAll('a'))
        links.forEach(link => {
            link.setAttribute('href', `${window.location.origin}${link.hash}`)
        })
        return this
    }
    
    parseClassState() {
        let contents = [].slice.call(this.content.querySelectorAll('*[data-bind-class]'))
        contents.forEach(domElem => {
            let css = {}
            const bindClass = domElem.dataset.bindClass.replace(/'/g, '"')
            try { css = window.JSON.parse(bindClass) 
            } catch (e) { 
                console.error(e) 
                css = {}
            }
            Object.entries(css).forEach(([className, condition]) => {
                const negation = condition.indexOf('!') > -1
                condition = condition.replace(/!|\s/g, '')
                let add = this.Model[condition]
                if (negation) add = !add
                domElem.classList[add ? 'add' : 'remove'](className)                
            });
        })
        return this
    }

    parseEvents() {
        let contents = [].slice.call(this.content.querySelectorAll('*[data-bind-event]'))
        contents.forEach(domElem => {
            const [evtName, funcName] = domElem.dataset.bindEvent.split(':')
            domElem.addEventListener(evtName, evt => {
                return this.update(evt, funcName)
            })
            delete domElem.dataset.bindEvent
        })
        return this
    }

    twoWayInputBind() {
        let inputs = [].slice.call(this.content.querySelectorAll('input, select, textarea'))       
        inputs
            .filter( field => field.dataset.bindInput !== 'false' )
            .filter( field => field.name || field.dataset.hasOwnProperty('bindModel') )
            .forEach(domElem => {
                domElem.dataset.bindInput = 'false'
                const evtName = this.checkedRegex.test(domElem.type) ? 'change' : 'input'
                domElem.addEventListener(evtName, (evt) => {
                    const target = evt.target
                    const property = target.name || target.dataset.bindModel
                    const value = evt.target.type === 'checkbox' ? target.checked : target.value
                    this.Model.dataBindModel = {[property]: value}
                })
            })
        return this
    }

    bindModelText() {
        let contents = [].slice.call(this.content.querySelectorAll('*[data-bind-model], input, select, textarea'))
        const obj = this.Model.dataBindModel
        contents
                .filter( domElem => !domElem.dataset.hasOwnProperty('bindReady'))
                .filter( domElem => domElem.name || domElem.dataset.hasOwnProperty('bindModel'))
                .forEach(domElem => {
            const property = domElem.name || domElem.dataset.bindModel
            if ( !domElem.dataset.hasOwnProperty('bindModel'))
                domElem.dataset.bindModel = property
            
            if ( !domElem.dataset.hasOwnProperty('bindReady'))
                domElem.dataset.bindReady = 'true'
            
            const selector = `*[data-bind-model="${property}"]`
            let val, safeVal
            const useSafeHTML = domElem.dataset.hasOwnProperty('bindSafe')

            if (obj.hasOwnProperty(property) && obj[property] !== undefined) {
                val = obj[property]
                safeVal = this.Model.escapeHTML(val)
                if( domElem.type === 'radio' ) domElem.checked = domElem.value === val
                else if( domElem.type === 'checkbox' ) domElem.checked = val
                else if ('value' in domElem) domElem.value = useSafeHTML ? safeVal : val
                else if ('innerHTML' in domElem) domElem.innerHTML = useSafeHTML ? safeVal : val
            }
            if (!domElem.matches('input, select, textarea'))
                domElem.dataset.bindDisplay = domElem.innerHTML.length ? 'visible' : 'hidden'
            if( domElem.dataset.hasOwnProperty('bindCallback')) this.update(domElem, domElem.dataset.bindCallback)            
            Object.defineProperty(obj, property, {
                get: () => { return val },
                set: (newValue) => {
                    let elems = [].slice.call(this.content.querySelectorAll(selector))
                    val = newValue
                    safeVal = this.Model.escapeHTML(val)
                    elems.forEach(elem => {
                        const useSafeHTML = elem.dataset.hasOwnProperty('bindSafe')
                        if( elem.type === 'radio' ) elem.checked = elem.value === val
                        else if( elem.type === 'checkbox' ) elem.checked = val
                        else if ('value' in elem) elem.value = useSafeHTML ? safeVal : val
                        else if ('innerHTML' in elem) elem.innerHTML = useSafeHTML ? safeVal : val
                        if (!elem.matches('input, select, textarea'))
                            elem.dataset.bindDisplay = elem.innerHTML.length ? 'visible' : 'hidden'     
                        if( elem.dataset.hasOwnProperty('bindCallback')) this.update(elem, elem.dataset.bindCallback)
                    })
                    this.parseClassState()
                },
                configurable: true
            })
            
        })
        
        return this
    }

}