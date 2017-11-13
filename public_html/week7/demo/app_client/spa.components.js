class Components {
    
   static todoTable(data){
        if ( !Array.isArray(data) ) return Promise.resolve('')
        return Promise.resolve(`${data.map(row=>                                         
                    `<tr>
                        <td>${row.author}</td>
                        <td>${row.rating}</td>
                        <td data-bind-class="{}">${row.reviewText}</td>
                        <td>${row.createdOnFormated}</td>
                        <td><button data-id="${row._id}" data-bind-event="click:deleteTodo" class="button is-danger is-outlined">Delete</button></td>
                        <td><button data-id="${row._id}" data-bind-event="click:goToUpdatePage" class="button is-link is-outlined">Update</button></td>
                    </tr>`
                ).join('')}`)
    }
    
}