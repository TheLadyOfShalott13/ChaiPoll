import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./authContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";

import DisplayCategoryTable from "./pages/category/Category";
import CreateCategory from "./pages/category/CreateCategory";
import ViewCategory from "./pages/category/ViewCategory";
import EditCategory from "./pages/category/EditCategory";

import CreateMenu from "./pages/menu/CreateMenu";
import ViewMenu from "./pages/menu/ViewMenu";
import EditMenu from "./pages/menu/EditMenu";

import DisplayRestaurantTable from "./pages/restaurants/Restaurants";
import CreateRestaurant from "./pages/restaurants/CreateRestaurant";
import ViewRestaurant from "./pages/restaurants/ViewRestaurant";
import EditRestaurant from "./pages/restaurants/EditRestaurant";

import OrderHistory from "./pages/order/OrderHistory";
import ViewOrder from "./pages/order/ViewOrder";

import Users from "./pages/user/Users";
import ViewUser from "./pages/user/ViewUser";

import Poll from "./pages/poll/Poll"

function App() {
    const { user } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Login title="Login to Create" />;
        } else {
            return children;
        }
    };

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/Category"             element={<ProtectedRoute><DisplayCategoryTable /></ProtectedRoute>} />
                <Route path="/CreateCategory"       element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
                <Route path="/EditCategory/:id"     element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
                <Route path="/ViewCategory/:id"     element={<ProtectedRoute><ViewCategory /></ProtectedRoute>} />

                <Route path="/CreateMenu/:id"       element={<ProtectedRoute><CreateMenu /></ProtectedRoute>} />
                <Route path="/EditMenu/:id"         element={<ProtectedRoute><EditMenu /></ProtectedRoute>} />
                <Route path="/ViewMenu/:id"         element={<ProtectedRoute><ViewMenu /></ProtectedRoute>} />

                <Route path="/Restaurant"           element={<ProtectedRoute><DisplayRestaurantTable /></ProtectedRoute>} />
                <Route path="/CreateRestaurant"     element={<ProtectedRoute><CreateRestaurant /></ProtectedRoute>} />
                <Route path="/EditRestaurant/:id"   element={<ProtectedRoute><EditRestaurant /></ProtectedRoute>} />
                <Route path="/ViewRestaurant/:id"   element={<ProtectedRoute><ViewRestaurant /></ProtectedRoute>} />

                <Route path="/OrderHistory"         element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                <Route path="/ViewOrder/:id"        element={<ProtectedRoute><ViewOrder /></ProtectedRoute>} />

                <Route path="/Users"                element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/ViewUser/:id"         element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />

                <Route path="/Poll"                 element={<ProtectedRoute><Poll /></ProtectedRoute>} />

                <Route path="/"                     element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/Login"                element={<Login />} />
                <Route path="/Register"             element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App
