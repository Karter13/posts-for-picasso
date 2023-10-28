export enum AppRoutes {
    MAIN = 'main',
    POSTS = 'posts',
    POST_DETAILS = 'post_details',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRoutePosts = () => '/posts';
export const getRoutePostDetails = (id: string) => `/posts/${id}`;
