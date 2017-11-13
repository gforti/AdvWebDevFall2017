class Model extends BaseModel {

    constructor() {
        super()  
        this.APIS = {
            Reviews : `//${window.location.hostname}:3001/api/v1/reviews/`
        }
    }
    
    
    getReviewList() {
        return this.http.get(this.APIS.Reviews)
                .then( data => {
                    data.forEach((review) => {
                        review.createdOnFormated = this.formatDate(review.createdOn)
                    })
                   return Components.todoTable(data).then(html => { return this.dataBindModel.todoTable = html })
                })
    }
    
    deleteTodo(evt) {
       const url = `${this.APIS.Reviews}${evt.target.dataset.id}`
       return this.http.delete(url)
                .then( ()=>{
                   return this.dataBindModel.deleteResultMsg = 'Review Deleted'                                
                }).catch( err => {
                    return this.dataBindModel.deleteResultMsg = 'Review was NOT Deleted'                                 
                }).then( () => {
                   return this.getReviewList()
                })
    
    }
    
    saveReview(evt) {
        
        let form = evt.target.form        
        if (!form.checkValidity()) {
            this.dataBindModel.saveResultMsg = 'All fields are required'
            return Promise.resolve()
        }
        const data = {
           author : this.dataBindModel.author,
           rating : this.dataBindModel.rating,
           reviewText : this.dataBindModel.reviewText
        }                    
        return this.http.post(this.APIS.Reviews, data)
                .then( data => {
                   this.dataBindModel.saveResultMsg = 'Review Saved'
                   return data
                }).catch( err => {
                   this.dataBindModel.saveResultMsg = 'Review was NOT Saved'   
                   return err
                })  
    }
    
    goToUpdatePage(evt) {
        this.redirect('update',{id: evt.target.dataset.id})
        return Promise.resolve()
    }
        
    updatePageLoad() {
        const url = `${this.APIS.Reviews}${this.urlParams().get('id')}`
        return this.http.get(url).then( data => {           
            this.dataBindModel = {author: data.author, rating: data.rating, reviewText: data.reviewText, _id: data._id }
            return data
        })     
    }

    updateTodo(evt) {
        let form = evt.target.form        
         if (!form.checkValidity()) {
             this.dataBindModel.updateResultMsg = 'All fields are required'
             return Promise.resolve()
         }
        const data = {
            author : this.dataBindModel.author,
            rating : this.dataBindModel.rating,
            reviewText : this.dataBindModel.reviewText
        }
         const url = `${this.APIS.Reviews}${this.dataBindModel._id}`
         return this.http.put(url, data)
                 .then( data => {
                     this.dataBindModel.updateResultMsg = 'Review updated'
                     return data
                 }).catch( err => {
                     this.dataBindModel.updateResultMsg = 'Review was NOT updated'   
                     return err
                 })  
    }

    get isDeleted() {
        const msg = this.dataBindModel.deleteResultMsg
        return msg && msg.toLowerCase().indexOf('not') === -1
    }

    get isAdded() {
        const msg = this.dataBindModel.saveResultMsg
        return msg && msg.toLowerCase().indexOf('not') === -1 && msg.toLowerCase().indexOf('required') === -1
    }

    get isUpdated() {
        const msg = this.dataBindModel.updateResultMsg
        return msg && msg.toLowerCase().indexOf('not') === -1 && msg.toLowerCase().indexOf('required') === -1
    }

}