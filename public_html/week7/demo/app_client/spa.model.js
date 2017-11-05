class Model extends BaseModel {

    constructor() {
        super()
        this.APIS = {
            Reviews : `//${window.location.hostname}:3001/api/v1/reviews/`
        }
    }

    getReviews() {
       return this.http.get(this.APIS.Reviews)
              .then( data => {
                   return this.dataBind.reviewTable = Components.resultsData(data)
               })
   }

   saveReviews() {
       const data = {
           author : this.dataBind.author,
           rating : this.dataBind.rating,
           reviewText : this.dataBind.reviewText
       }
       return this.http.post(this.APIS.Reviews, data)
               .then( data => {
                   this.dataBind.saveResultMsg = 'Review Saved'
                   return data
               }).catch( err => {
                   this.dataBind.saveResultMsg = 'Review NOT Saved'
                   return err
               })
   }

   deleteReview(evt) {
       const url = `${this.APIS.Reviews}${evt.target.dataset.id}`
       return this.http.delete(url)
               .then( ()=>{
                   return this.dataBind.deleteResultMsg = 'Review Deleted'
               }).catch( err => {
                    return this.dataBind.deleteResultMsg = 'Review NOT Deleted'
               }).then( () => {
                   return this.getReviews()
               })
   }

   updateAuthor(evt){
       this.dataBind.author = evt.target.value
       return Promise.resolve()
   }

   updatePage(evt){
       const params = this.generateUrlParams({id: evt.target.dataset.id})
       window.location.href = `${params}#update`
       return Promise.resolve()
   }

   updatePageLoad(){
       const url = `${this.APIS.Reviews}${this.urlParams().get('id')}`
       return this.http.get(url).then( data => {
           this.dataBind.author = data.author
           this.dataBind.rating = data.rating
           this.dataBind.reviewText = data.reviewText
           this.dataBind._id = data._id
           return data
       })
   }

   updateReviews(){
       const data = {
           author : this.dataBind.author,
           rating : this.dataBind.rating,
           reviewText : this.dataBind.reviewText
       }
       const url = `${this.APIS.Reviews}${this.dataBind._id}`
       return this.http.put(url, data)
               .then( data => {
                   this.dataBind.updateResultMsg = 'Review updated'
                   return data
               }).catch( err => {
                   this.dataBind.updateResultMsg = 'Review NOT updated'
                   return err
               })
   }

}