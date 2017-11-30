class Controller {

    constructor(model) {
        this.Model = model
    }

    home() {
        return this.Model.getReviewList().then(()=> {
            return 'home'
        })
    }
    
    add() { 
        this.Model.clearDataBindModel()
        return window.Promise.resolve('home')
    }
    
    update() {        
        return this.Model.updatePageLoad().then(()=> {return 'update'})
    }

}