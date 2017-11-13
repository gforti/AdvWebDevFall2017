class Controller {

    constructor(model) {
        this.Model = model
    }

    home() {
        return this.Model.getReviews()
    }

    add() {                   
        return Promise.resolve()
    }
    
    update() {        
        return this.Model.updatePageLoad()
    }

}