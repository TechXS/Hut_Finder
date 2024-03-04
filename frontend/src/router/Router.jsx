import {createBrowserRouter} from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import Error from "../components/Error/Error";
import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../components/SignIn/ForgotPassword.jsx";
import SignUp from "../pages/SignUp";
import LandlordSignUp from "../components/SignUp/LandlordSignUp";
import ClientSignUp from "../components/SignUp/ClientSignUp";
import LandlordSignIn from "../components/SignIn/LandlordSignIn.jsx";
import SignIn from "../pages/SignIn.jsx";
import ClientSignIn from "../components/SignIn/ClientSignIn.jsx";
import ResetPassword from "../components/SignIn/ResetPassword.jsx";
import CancelResetPassword from "../components/SignIn/CancelResetPassword.jsx";
import PortalLayout from "../layouts/PortalLayout.jsx";
import BrowseLayout from "../layouts/BrowseLayout.jsx";
// import Properties from "../pages/Properties.jsx";
// import AddProperty from "../pages/AddProperties.jsx";
// import Property from "../pages/Property.jsx";
import PropertyLayout from "../layouts/PropertyLayout.jsx"
import Property from "../pages/PropertyPage/AddProperty.jsx";
import LandlordLayout from "../layouts/LandlordLayout.jsx";
import SearchItemList from "../components/SearchItem/SearchItem.jsx";
import Profile from "../components/profile/Profile.jsx";
//import Profile from "../components/profile/ClientProfile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout/>,
        errorElement: <Error/>,
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: "/auth/signup",
                element: <SignUp/>,
                children: [
                    {path: "/auth/signup/landlord", element: <LandlordSignUp/>},
                    {path: "/auth/signup/client", element: <ClientSignUp/>},
                ],
            },
            {
                path: "/auth/signin",
                element: <SignIn/>,
                children: [
                    {path: "/auth/signin/landlord", element: <LandlordSignIn/>},
                    {path: "/auth/signin/client", element: <ClientSignIn/>},
                    {path: "/auth/signin/forgotpassword", element: <ForgotPassword/>},
                    {path: "/auth/signin/resetpassword", element: <ResetPassword/>},
                    {
                        path: "/auth/signin/cancelresetpassword",
                        element: <CancelResetPassword/>,
                    },
                ],
            },
        ],
    },
    {
        path: "/:layout",
        element: <PortalLayout/>,
        children: [
            {
                path: "/:layout/dashboard",
                element: <>dashboard</>,
            },
        ],
    },
    {
        path: "/browse",
        element: <BrowseLayout/>,
        errorElement: <Error/>,
    },
    {
        path: "/property",
        element: <PropertyLayout/>,
        errorElement: <Error/>,
    },
    //{
    //    path: "/addproperty",
    //    element: <Property/>,
    //    errorElement: <Error/>,
    //},

    {
        path:"/landlord",
        element: <LandlordLayout />,
        children:[
            //{
            //      path:"/landlord/browse",
            //      element:<BrowseLayout/>,
            //
            //    },
        //  {
        //    index: true,
        //    element: <Dashboard />
        //  },
        //  {
        //    path:"/landlord/stats",
        //    element: <Stats />,
        //
        //  },
        //  {
        //    path:"/landlord/properties",
        //    element: <List />,
        //
        //  },
        //  {
        //    path:"/landlord/propertypage",
        //    element: <Property />,
        //
        //  },
        {
          path:"/landlord/profile",
          element: <Profile />,

        },
        //  {
        //    path:"/landlord/complaints",
        //    element: <ComplaintsPage />,
        //
        //  },
        ]

      },

    //Eric
    // {
    //     path:'/properties',
    //     element: <Properties />
    //
    // },
    // {
    //     path: '/addproperty',
    //     element: <AddProperty/>
    // },
    // {
    //     path:'/property',
    //     element: <Property />
    // }
]);

export default router;
