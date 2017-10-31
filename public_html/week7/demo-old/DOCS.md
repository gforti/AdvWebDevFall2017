# SSPAF Simple Single Page Application Framework

The idea here is to create a single page app with modern JavaScript.  This is not a full featured framework.  There is no security and is intended for school, sample projects or quick prototypes.

## spa.js

This file is the core of the SPA.  It's the director and manages the page.  Nothing needs to be updated or added unless you would like to add or fix the functionality.

`SSPAF` supports

- Simple hash navigation
- Query Param handling
- Two way binding
- Auto Form two way binding with changes made
- Http calls
- Event Listener binding
- Loading Screen
- Promise based implemenation
- Modern use of JavaScript (es6+)


## spa.views.js

The views are your page templates.  When a hash triggers a page the view will be loaded.

The hash name must match the view name.

> location `#test` must have `test() { return html }`

You can add the `data-bindText` attribute to an tag to inject html from the model.

The value of the custom attribute will be tied to the `model.bindData` object

```html
<p data-bindText="reviews"></p>
```
Inside of `spa.model.js`
```js
this.bindData.reviews = `<strong>Hello World</strong>`
```

Events can also be binded to html tags with the custom attribute `data-event` like so

```html
<input type="text" name="author" data-event="keyup:updateAuthor" />
```
or 
```html
<input type="button" value="submit" data-event="click:saveReviews" />
```

The first value is the event followed by the function to be called from the `Model class`

> data-event="`event`:`function`"

Must be a supported event in JavaScript. The function cannot pass any custom paramters but does pass the event object.

You can access the event to get the target.

```html
<button data-id="${row._id}" data-event="click:updatePage">Update</button>
```

In the `spa.model.js` file you can write the event like so
```js
updatePage(evt){       
    const params = `?id=${evt.target.dataset.id}`       
    window.location.href =  `${params}#update` 
    return Promise.resolve()
}
```


## spa.components.js

This file is to place component views that are injected after the page is loaded.
> All functions should be `static`

Data can be passed and processed to return the html for the view.  To be properly injected you must update the `bindData` from the `Model class`
and also bind the text into the html view.

`spa.views.js`
```html
<tbody data-bindtext="reviewTable"></tbody>
```

`spa.components.js`
```js
static resultsData(data){
    if ( ! Array.isArray(data) ) return ''
    return `${data.map(row=>                                         
                `<tr>
                    <td>${row.author}</td>
                    <td>${row.rating}</td>
                    <td>${row.reviewText}</td>
                    <td><button data-id="${row._id}" data-event="click:deleteReview">Delete</button></td>
                    <td><button data-id="${row._id}" data-event="click:updatePage">Update</button></td>
                </tr>`
            ).join('')}`
}
```

`spa.model.js`
```js
getReviews() {
    return this.http.get(this.APIS.Reviews)
           .then( data => {
                return this.dataBind.reviewTable = Components.resultsData(data) 
            })                       
}
```


## spa.model.js

The Model is where all your business logic should be. Functions that will be executed from `data-event`s or values that will be binded 
with this.bindData are to be handled within the `Model class`.

The Model comes with code to store API endpoints, the bindData object, http calls with fetch, and support for url params

Here are some samples on how to create functions.

```js
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
```

## spa.controller.js

Like the view, each controller function must match the hash name used to generate the page.

> location `#test` must have `test() { return Promise }`

```js
home() {
    return this.model.getReviews()
}
```

If the page does not need to process any data from the model before the view is rendered you can simply just do

```js
add() {                   
    return Promise.resolve()
}
``` 

> A `promise` must be returned