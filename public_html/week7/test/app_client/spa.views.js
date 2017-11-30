class View {

    get home() {
        return Promise.resolve(`<h1>Home page</h1>`)
    }
    
    get test() {
        return Promise.resolve(`<h1>Test page</h1>

            <button data-bind-event="click:toggle">Toggle</button>
            <p data-bind-model="fname" data-bind-class="{'good': 'yay', 'bad': '!yay'}"></p>
            <input type="text" name="fname" />
            <button data-bind-event="click:loadTestData">Update Input</button>


        `)
    }
    
}