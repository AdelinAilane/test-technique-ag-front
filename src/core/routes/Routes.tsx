import {Navigate, useRoutes} from "react-router-dom";
import Home from "../../pages/Home/home";
import ParkManagement from "../../pages/Park/ParkManagement";
import NotFound from "../../pages/NotFound/NotFound";

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: "",
            children: [
                {
                    path: "",
                    element: <Home/>,
                },
                {
                    path: "parks",
                    element: <ParkManagement />,
                },
            ],
        },
        { path: '/notFound', element: <NotFound /> },
        { path: '*', element: <Navigate to="/notFound" replace /> },
        // { path: "team", element: <AboutPage /> },
    ]);
    return routes;
}

export default AppRoutes;
