class SPA {
                
    constructor(route) {
        this.content = document.querySelector('div.content')
        this.loading = document.querySelector('div.loading').classList
        this.model = new Model()
        this.view = new View()
        this.controller = new Controller(this.model)

        window.addEventListener('hashchange', ()=>{
            this.loadingStart()
            this.model.dataBind = {}
            let page = `${window.location.hash.slice(1).split('?')[0]}`
            document.body.id = page            
            this.controller[page]()
                .then( ()=> { this.renderContent(this.view[page]).bindModelText().parseEvents().twoWayFormBind().loadingEnd().cleanNavLinks() })
                .catch( err => {
                    this.renderContent('<p>There was an error with the request</p>').loadingEnd()
                    console.error(err)
                })
                
            window.location.href.replace(window.location.search, '');
        })

        if ( !window.location.hash && typeof route === 'string') {
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

    update(evt, funcName){
        this.model[funcName](evt).then(()=>{
            this.bindModelText().parseEvents().twoWayFormBind()
        }) 
    }
    
    cleanNavLinks(){
      let links = document.querySelector('nav').querySelectorAll('a')
      links.forEach( link => { link.setAttribute('href', `${link.origin}${link.hash}`) })
      return this
    }


    parseEvents() {
        let contents = this.content.querySelectorAll('*[data-event]')                    
        contents.forEach( domElem => {
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
                if (property && target.matches('input') || target.matches('select')) {
                  this.model.dataBind[property] = target.value                              
                }
            })
            delete form.dataset.bindall
        } 

        return this
    }

    bindModelText() {
        let contents = this.content.querySelectorAll('*[data-bindtext],input[name], select[name]')
        const obj = this.model.dataBind
        if (contents) {
            contents.forEach( domElem => {
                const property = domElem.name || domElem.dataset.bindtext
                const selector = `*[data-bindText="${property}"],input[name="${property}"], select[name="${property}"]`
                let val       
                if ( obj[property] ) {
                    val = obj[property]
                    if ('value' in domElem) domElem.value = val
                    else if ('innerHTML' in domElem) domElem.innerHTML = val
                } 
                Object.defineProperty(obj, property, {
                    get: () => { return val }, 
                    set: (newValue) => { 
                        let elems = document.querySelectorAll(selector)
                        val = newValue
                        if (elems) {
                            elems.forEach(elem => {
                                if ('value' in elem) elem.value = val
                                else if ('innerHTML' in elem) elem.innerHTML = val
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