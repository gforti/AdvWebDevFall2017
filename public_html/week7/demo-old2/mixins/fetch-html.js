Object.assign(View.prototype, {
    fetchHTML(file) {
        return fetch(file)
                .then(response => {
                    if (!response.ok)
                        throw Error(response.statusText)                    
                    return response.text()
                })
                .then( text => {
                    let doc = new DOMParser().parseFromString(text, "text/html");
                    return doc.body.innerHTML.toString()
                })
                .catch(err => {
                    console.error(err)
                    return '<p>Could not fetch file: ${file}</p>'
                })
    }
})

