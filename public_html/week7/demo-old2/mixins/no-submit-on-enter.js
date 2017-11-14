window.addEventListener('spaRouteReady', ()=>{ 
    [].slice.call(document.querySelectorAll('*[data-custom-no-submit]')).forEach( form => {
        form.addEventListener('submit', event => event.preventDefault())
    })    
})