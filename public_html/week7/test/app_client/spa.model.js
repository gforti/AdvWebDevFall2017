class Model extends BaseModel {

    constructor() {
        super()        
    }

    toggle(){
      this.dataBindModel.toggle = !this.dataBindModel.toggle
      return Promise.resolve()
    }
    
    loadTestData() {
      this.dataBindModel.fname = 'Gabriel' 
      return Promise.resolve()
    }
    
    get yay() {
        return this.dataBindModel.toggle
    }
}