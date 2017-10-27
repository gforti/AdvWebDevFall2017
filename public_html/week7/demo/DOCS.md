# SSPAF Simple Single Page Application Framework

The idea here is to create a single page app with modern JavaScript.  This is not a full featured framework.  There is no security and is intended for school, sample projects or quick prototypes.

### spa.js

This file is the core of the SPA.  It's the director and manages the page.  Nothing needs to be updated or added unless you would like to add or fix the functionality.

### spa.views.js

The views are your page templates.  When a hash triggers a page the view will be loaded.

The hash name must match the view name.

> #test must have test() { return html }

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

The first value is the event followed by the function to be called from the `model class`

> `event`:`function`
