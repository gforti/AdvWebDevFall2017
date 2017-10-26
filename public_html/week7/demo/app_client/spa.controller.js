class Controller {
                
    constructor(model) {
        this.model = model                   
    }

    home() {
        return this.model.getReviews()
    }

    add() {                   
        return Promise.resolve()
    }

    test() {
        return Promise.resolve()
    }
    
    update() {        
        return this.model.updatePageLoad()
    }

}