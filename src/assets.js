// Public assets must follow the deployment base, including GitHub Pages project URLs.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
