import {Navigate, useRoutes} from "react-router-dom";
import Home from "../../pages/Home/home";
import ParkManagement from "../../pages/Park/ParkManagement";
import NotFound from "../../pages/NotFound/NotFound";
import OfferManagement from "../../pages/Offer/OfferManagement";

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
                {
                    path: "offers",
                    element: <OfferManagement />,
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
