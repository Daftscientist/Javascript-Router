class Route {
    constructor(path, htmlPath, JSPath, title) {
        this.path = path;
        this.htmlPath = htmlPath;
        this.JSPath = JSPath;
        this.title = title || '';
    }

    async getHtmlContent(baseUrl = '/') {
        const fullPath = baseUrl + this.htmlPath;
        const response = await fetch(fullPath);
        return response.text();
    }

    getFullJSPath(baseUrl = '/') {
        return baseUrl + this.JSPath;
    }
}

class Router {
    constructor(entryDOM, notFoundRoute, loadingRoute = null, baseUrl = '/') {
        if (!entryDOM || !(entryDOM instanceof HTMLElement)) {
            throw new Error('entryDOM is required and must be a DOM element');
        }
        if (!notFoundRoute || !(notFoundRoute instanceof Route)) {
            throw new Error('notFoundRoute is required and must be an instance of Route');
        }

        // Ensure baseUrl ends with '/'
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

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
        const path = window.location.pathname;
        return this.removeBaseUrl(path); // Adjusted to remove baseUrl
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
            this.entry.innerHTML = await this.loadingRoute.getHtmlContent(this.baseUrl);
        }

        // Check for an exact route match
        let route = this.routes.find(r => r.path === path);

        // If no exact match, fallback to the notFoundRoute or default route
        if (!route) {
            route = this.notFoundRoute; // Fallback to notFoundRoute or default route
        }

        document.title = route.title || 'Document';
        this.entry.innerHTML = await route.getHtmlContent(this.baseUrl);

        // Remove existing page script if any
        const existingScript = document.getElementById('page_script');
        if (existingScript) {
            existingScript.remove();
        }

        const scriptTag = document.createElement('script');
        scriptTag.src = route.getFullJSPath(this.baseUrl);
        scriptTag.id = 'page_script';
        document.body.appendChild(scriptTag);

        // Use relativePath for pushState
        const relativePath = this.prependBaseUrl(path);
        window.history.pushState({ path: relativePath }, '', relativePath);
    }

    handlePopState = (event) => {
        const path = event.state ? event.state.path : this.notFoundRoute.path;
        console.log(path);
        this.navigateTo(path);
    }

    prependBaseUrl(path) {
        if (this.baseUrl === '/' && path.startsWith('/')) {
            return path; // No need to prepend if baseUrl is '/'
        } else {
            return this.baseUrl + (path.startsWith('/') ? path.slice(1) : path);
        }
    }

    removeBaseUrl(path) {
        if (this.baseUrl === '/' || !path.startsWith(this.baseUrl)) {
            return path; // If baseUrl is '/' or path doesn't start with baseUrl, return path as is
        } else {
            return path.slice(this.baseUrl.length - 1); // Remove baseUrl from path
        }
    }
}

// Export the Route and Router classes
export { Route, Router };
