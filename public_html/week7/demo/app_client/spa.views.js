class View {

    get home() {
        return Promise.resolve(`<section class="hero is-info is-small spacer">
                    <div class="hero-body">
                        <h1 class="title">Todo Crud Sample</h1>
                    </div>
                </section>
                <p data-bind-model="deleteResultMsg" data-bind-safe data-bind-class="{'is-success': 'isDeleted', 'is-danger': '!isDeleted' }" class="notification is-spaced"></p>              
                <table class="table is-spaced is-bordered is-hoverable is-fullwidth is-small">
                  <thead>
                    <tr class="is-selected">
                        <th>Author</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Created</th>
                        <th></th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody data-bind-model="todoTable"></tbody>
              </table>`)
    }
    
     get add() {
        return Promise.resolve(`<section class="hero is-info is-small spacer">
                    <div class="hero-body">
                        <h1 class="title">Add New Todo</h1>
                    </div>
                </section>
                <form data-no-submit>
                    <div class="field">
                        <label class="label">Author</label>
                        <input type="text" name="author" class="input" required />
                    </div>
                    <div class="field">
                        <label class="label">Rating</label>
                        <select name="rating" class="select" required>
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div class="field">
                        <label class="label">Review</label>
                        <textarea name="reviewText" class="textarea" required></textarea>
                    </div>
                    <div class="field"> 
                        <input type="reset" value="reset" class="button is-primary is-outlined" />
                        <input type="button" value="submit" class="button is-link" data-bind-event="click:saveReview" /> 
                    </div>
                    <p data-bind-model="saveResultMsg" data-bind-safe data-bind-class="{'is-success': 'isAdded', 'is-danger': '!isAdded' }" class="notification"></p>
                </form>`)
    }

    get update() {
        return Promise.resolve(`<section class="hero is-info is-small spacer">
                    <div class="hero-body">
                        <h1 class="title">Update Todo ID <span data-bind-model="_id" class="has-text-warning"></span></h1>
                    </div>
                </section>
                <form data-no-submit>
                    <div class="field">
                        <label class="label">Author</label>
                        <input type="text" name="author" class="input" required />
                    </div>
                    <div class="field">
                        <label class="label">Rating</label>
                        <select name="rating" class="select" required>
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div class="field">
                        <label class="label">Review</label>
                        <textarea name="reviewText" class="textarea" required></textarea>
                    </div>
                    <div class="field">
                        <input type="button" value="submit" data-bind-event="click:updateTodo" class="button is-link" />
                    </div>
                    <p data-bind-model="updateResultMsg" data-bind-safe data-bind-class="{'is-success': 'isUpdated', 'is-danger': '!isUpdated' }" class="notification is-spaced"></p>
                </form>`)
    }
    
}