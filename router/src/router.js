
class Router {
    constructor (baseUrl, entryDOM) {
        if (!baseUrl || baseUrl === '') {
            throw new Error('baseUrl is required');
        }
        if (!entryDOM || !(entryDOM instanceof HTMLElement)) {
            throw new Error('entryDOM is required and must be a DOM element');
        }

        this.baseUrl = baseUrl;
        this.routes = [];
        this.entry = entry;
    }

    addRoute (path, handler) {
        this.routes.push({ path, handler });
    }

    navigateTo (path) {
    }


}