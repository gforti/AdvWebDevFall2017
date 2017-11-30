Object.assign(BaseModel.prototype, {
    redirect(route = window.location.hash.slice(1).split('?')[0], params = {}) {
        const query = this.generateUrlParams(params)
        window.location.assign(`${query}#${route}`)
    }
})