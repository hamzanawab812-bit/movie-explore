
# CSR vs SSR Comparison

## 1. Introduction

Rendering is the process of displaying web page content in the browser.

There are two common rendering methods in Next.js:

- Client-Side Rendering (CSR)
- Server-Side Rendering (SSR)

## 2. What is CSR?

Client-Side Rendering means that the browser renders the page using JavaScript.

In CSR, the browser first loads the page, then JavaScript fetches data from an API and displays it.

### CSR in Our Project

We used:
- useState() to store movie data.
- useEffect() to fetch movies.
- fetch() to call our API.
- Loading and error states to handle API responses.

### Advantages of CSR

- Smooth user interactions.
- Good for interactive applications.
- Updates data without reloading the complete page.

### Disadvantages of CSR

- Initial page loading can be slower.
- Search engines may have difficulty indexing some content.
- Requires JavaScript to display dynamically fetched content.

## 3. What is SSR?

Server-Side Rendering means that the server fetches data and renders the page before sending it to the browser.

In Next.js, Server Components can fetch data directly on the server.

### SSR in Our Project

We used:
- Async Server Component.
- fetch() to get movie data.
- async/await to handle API requests.
- cache: "no-store" to get fresh data.

### Advantages of SSR

- Content is available in the initial HTML.
- Better SEO potential.
- Useful for dynamic and frequently updated content.

### Disadvantages of SSR

- Server handles requests and rendering.
- Can increase server workload.
- Some interactive features require Client Components.

## 4. Difference Between CSR and SSR

| CSR | SSR |
|---|---|
| Rendering happens in browser | Rendering happens on server |
| Uses useEffect for client fetching | Fetches data on server |
| Initial content may be delayed | Content is included in initial HTML |
| Good for interactive applications | Good for SEO-friendly pages |
| Requires client-side JavaScript for rendering fetched data | Server sends rendered HTML |

## 5. SEO Comparison

SSR is generally better for SEO because the server sends HTML containing the page content.

CSR can also be indexed by modern search engines, but SSR makes important content available earlier.

## 6. When to Use CSR?

CSR is useful for:
- Admin dashboards.
- Interactive applications.
- Search interfaces.
- User-specific pages.

## 7. When to Use SSR?

SSR is useful for:
- Movie websites.
- News websites.
- Product pages.
- Content-focused websites.

## 8. Conclusion

Both CSR and SSR are useful rendering techniques.

In our Movie Explorer project, we implemented both methods using Next.js.

The CSR version fetches movies in the browser using useEffect and useState.

The SSR version fetches movies on the server using an asynchronous Server Component.

This project helped us understand the differences, advantages, and use cases of both rendering techniques.
