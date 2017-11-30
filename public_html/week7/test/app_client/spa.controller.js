class Controller {

    constructor(model) {
        this.Model = model
    }

    home() {
        return Promise.resolve()
    }
    
    test() {
        return this.Model.loadTestData()
    }

}