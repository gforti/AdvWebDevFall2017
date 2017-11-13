class View {

    get home() {                    
        const html = `<p data-bindtext="deleteResultMsg"></p>
                      <table>
                        <thead>
                            <th>Author</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th></th>
                        </thead>
                        <tbody data-bindtext="reviewTable">                                                    
                        </tbody>
                    </table>`                                
        return html
    }  

    get add() {                    
        return `<form data-bindall>
                        <p>
                            <label>Author</label>
                            <input type="text" name="author" data-event="keyup:updateAuthor" />
                             <p data-bindtext="author"></p>
                        </p>
                        <p>
                            <label>Rating</label>
                            <select name="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <p>
                            <label>Review</label>
                            <input type="text" name="reviewText" />
                        </p>
                        <p data-bindtext="saveResultMsg"></p>
                        <p> <input type="button" value="submit" data-event="click:saveReviews" /> </p>
                    </form>`
    }
    
    get update() { 
        return `<form data-bindall>
                    <p>Update</p>
                    <p>
                        <label>Author</label>
                        <input type="text" name="author" />
                    </p>
                    <p>
                        <label>Rating</label>
                        <select name="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                    <p>
                        <label>Review</label>
                        <textarea type="text" name="reviewText"></textarea>
                    </p>
                    <p data-bindtext="updateResultMsg"></p>
                    <p> <input type="button" value="submit" data-event="click:updateReviews" /> </p>
                </form>`
    }

}