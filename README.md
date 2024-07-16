# Pure JavaScript Router

This project provides a lightweight and flexible router implementation entirely in vanilla JavaScript. It allows you to manage client-side routing and page navigation without the need for additional libraries or frameworks.

## Getting Started

To use the Pure JavaScript Router in your project, follow these steps:

### Using the CDN

You can include the router directly from the CDN hosted at [https://leojohnston.me/cdn/javascript-router/_dist/router.min.js](https://leojohnston.me/cdn/javascript-router/_dist/router.min.jss) in your HTML file:

```html
<script src="https://leojohnston.me/cdn/javascript-router/_dist/router.min.js"></script>
```

### Initializing the Router

1. **Include the Router Script**: Ensure the router script is included in your HTML file before using it:

   ```html
   <script src="https://leojohnston.me/cdn/javascript-router/_dist/router.min.js"></script>
   ```

2. **Define Routes**: Create instances of `Route` and add them to the router:

   ```javascript
   // Example routes
   const homeRoute = new Route('/', '/views/home.html', '/js/home.js', 'Home');
   const aboutRoute = new Route('/about', '/views/about.html', '/js/about.js', 'About');
   // Add routes to the router
   myRouter.addRoute(homeRoute);
   myRouter.addRoute(aboutRoute);
   ```

3. **Navigation**: Use the `navigateTo` method of the router to navigate programmatically:

   ```javascript
   // Example navigation
   myRouter.navigateTo('/about');
   ```

### Example Usage

Here's a basic example of setting up and using the Pure JavaScript Router:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Pure JavaScript Router Example</title>
    <script src="https://leojohnston.me/cdn/javascript-router/_dist/router.min.js"></script>
</head>
<body>
    <div id="app"></div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const app = document.getElementById('app');
            
            // Initialize router
            const myRouter = new Router('/', app);

            // Define routes
            const homeRoute = new Route('/', '/views/home.html', '/js/home.js', 'Home');
            const aboutRoute = new Route('/about', '/views/about.html', '/js/about.js', 'About');

            // Add routes to the router
            myRouter.addRoute(homeRoute);
            myRouter.addRoute(aboutRoute);

            // Initial navigation
            myRouter.navigateTo(window.location.pathname.replace(myRouter.baseUrl, ''));
        });
    </script>
</body>
</html>
```

## CDN Link

Use the following CDN link to include the Pure JavaScript Router in your project:

- [https://leojohnston.me/cdn/javascript-router/_dist/router.min.js](https://leojohnston.me/cdn/javascript-router/_dist/router.min.js)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.