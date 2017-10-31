class Model {
                
    constructor() {
       this.APIS = {
           Reviews : 'http://localhost:3001/api/v1/reviews/'
       }
       this.dataBind = {}

       this.http = {
           get: (url) => {
               return this.httpFetch(url, null, 'GET').then( response => response.json())
           },
           post: (url, data) => {
               return this.httpFetch(url, data, 'POST').then( response => response.json())
           },
           put: (url, data) => {
               return this.httpFetch(url, data, 'PUT').then( response => response.json())
           },
           delete: (url) => {
               return this.httpFetch(url, null, 'DELETE')
           }
       }
   }


   httpFetch(url, data, verb){                    
       let myHeaders = new Headers()
       myHeaders.set('Content-Type', 'application/json')
       let myInit = { method: verb, headers: myHeaders, mode: 'cors', cache: 'default'}                    
       if ( data ) {
           myInit.body = JSON.stringify(data)
       }
       const myRequest = new Request(url, myInit);                
       return fetch(myRequest)
               .then(response => {
                   if (!response.ok) throw Error(response.statusText)
                   return response;
               })                            
   }
   
   urlParams(){
       return new URLSearchParams(window.location.search);
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
       const params = `?id=${evt.target.dataset.id}`       
       window.location.href =  `${params}#update` 
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