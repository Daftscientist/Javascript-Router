class Route {
    constructor(path, htmlPath, JSPath, title) {
        this.path = path;
        this.htmlPath = htmlPath;
        this.JSPath = JSPath;
        this.title = title || '';
    }

    async getHtmlContent() {
        const response = await fetch(this.htmlPath);
        return response.text();
    }
}

class Router {
    constructor(entryDOM, notFoundRoute, loadingRoute = null) {
        if (!entryDOM || !(entryDOM instanceof HTMLElement)) {
            throw new Error('entryDOM is required and must be a DOM element');
        }
        if (!notFoundRoute || !(notFoundRoute instanceof Route)) {
            throw new Error('notFoundRoute is required and must be an instance of Route');
        }

        this.routes = [];
        this.entry = entryDOM;
        this.notFoundRoute = notFoundRoute;
        this.loadingRoute = loadingRoute;

        window.onpopstate = (event) => this.handlePopState(event);
    }

    addRoute(route) {
        this.routes.push(route);
    }

    getCurrentPath() {
        return window.location.pathname;
    }

    isPathActive(path) {
        return this.getCurrentPath() === path;
    }

    isRouteActive(route) {
        return this.isPathActive(route.path);
    }

    async init() {
        const path = this.getCurrentPath();
        await this.navigateTo(path);
    }

    async navigateTo(path) {
        if (this.loadingRoute) {
            document.title = this.loadingRoute.title || 'Loading...';
            this.entry.innerHTML = await this.loadingRoute.getHtmlContent();
        }

        const route = this.routes.find(r => r.path === path) || this.notFoundRoute;
        document.title = route.title || 'Document';
        this.entry.innerHTML = await route.getHtmlContent();

        // Remove existing page script if any
        const existingScript = document.getElementById('page_script');
        if (existingScript) {
            existingScript.remove();
        }

        const scriptTag = document.createElement('script');
        scriptTag.src = route.JSPath;
        scriptTag.id = 'page_script';
        document.body.appendChild(scriptTag);

        // Ensure the path is relative to baseUrl
        const relativePath = path.startsWith('/') ? path : `/${path}`;

        // Use relativePath for pushState
        window.history.pushState({ path: relativePath }, '', relativePath);
    }

    handlePopState = (event) => {
        const path = event.state ? event.state.path : this.notFoundRoute.path;
        console.log(path);
        this.navigateTo(path);
    }
}

export { Route, Router };
