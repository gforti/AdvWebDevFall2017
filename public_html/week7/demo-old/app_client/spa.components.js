class Components {
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
}