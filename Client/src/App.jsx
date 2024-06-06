import './App.css';
import { LoginPage } from "./pages/Login";
import { AddEmployee } from "./pages/AddEmployee";
import { ViewEmployee } from "./pages/ViewEmployee";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function App() {
    axios.defaults.withCredentials = true;
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <ViewEmployee />
                        </>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <>
                            <Header />
                            <AddEmployee />{" "}
                        </>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
