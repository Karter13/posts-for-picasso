import { useCallback, Suspense, memo } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import { PageLoader } from "widgets/PageLoader";
import { routeConfig } from "../config/routeConfig";


export const AppRouter = memo( () => {

    const renderWithWrapper = useCallback((route: RouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );

    }, [])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
});
