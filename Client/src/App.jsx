import { Layout, RequireAuth } from "./routes/layout/layout.jsx";
import HomePage from "./routes/homePage/homePage.jsx";
import ListPage from "./routes/listPage/listPage.jsx";
import LoginPage from "./routes/loginPage/loginPage.jsx";
import DetailsPage from "./routes/detailsPage/detailsPage.jsx";
import RegisterPage from "./routes/registerPage/registerPage.jsx";
import AddpostPage from "./routes/addpostPage/addpostPage.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage.jsx";
import {
    detailsPageLoader,
    listPageLoader,
    myListLoader,
} from "./lib/loaders.js";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={<HomePage />}
                        loader={listPageLoader}
                    />
                    <Route
                        path="list"
                        element={<ListPage />}
                        loader={listPageLoader}
                    />
                    <Route
                        path=":id"
                        element={<DetailsPage />}
                        loader={detailsPageLoader}
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route element={<RequireAuth />}>
                    <Route
                        path="user"
                        element={<ProfilePage />}
                        loader={myListLoader}
                    />
                    <Route path="user/update" element={<ProfileUpdatePage />} />
                    <Route path="add" element={<AddpostPage />} />
                </Route>
            </>,
        ),
    );

    return <RouterProvider router={router} />;
}

export default App;

// function App() {
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: <Layout />,
//             children: [
//                 {
//                     path: "/",
//                     element: <HomePage />,
//                 },
//                 {
//                     path: "/list",
//                     element: <ListPage />,
//                     loader: listPageLoader,
//                 },
//                 {
//                     path: "/:id",
//                     element: <DetailsPage />,
//                     loader: detailsPageLoader,
//                 },
//                 {
//                     path: "/login",
//                     element: <LoginPage />,
//                 },
//                 {
//                     path: "/register",
//                     element: <RegisterPage />,
//                 },
//             ],
//         },
//         {
//             path: "/",
//             element: <RequireAuth />,
//             children: [
//                 {
//                     path: "/user",
//                     element: <ProfilePage />,
//                     loader: myListLoader,
//                 },
//                 {
//                     path: "/user/update",
//                     element: <ProfileUpdatePage />,
//                 },
//                 {
//                     path: "/add",
//                     element: <AddpostPage />,
//                 },
//             ],
//         },
//     ]);

//     return <RouterProvider router={router} />;
// }

// export default App;
