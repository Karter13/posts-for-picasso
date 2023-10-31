import { AppRoutes, getRouteMain, getRoutePostDetails, getRoutePosts } from 'shared/const/router';
import { PostsPage } from 'pages/PostsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PostDetailsPage } from 'pages/PostDetailsPage';

export const routeConfig = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: < PostsPage />,
    },
    [AppRoutes.POSTS]: {
        path: getRoutePosts(),
        element: < PostsPage />,
    },
    [AppRoutes.POST_DETAILS]: {
        path: getRoutePostDetails(':id'),
        element: < PostDetailsPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    }
};
