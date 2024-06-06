import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useLoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const cookie = document.cookie.split(";").reduce((res, c) => {
            const [key, val] = c.trim().split("=").map(decodeURIComponent);
            try {
                return Object.assign(res, { [key]: JSON.parse(val) });
            } catch (e) {
                return Object.assign(res, { [key]: val });
            }
        }, {});
        console.log("USELOGGEDIN", cookie);
        if (cookie["loggedIn"] != true) {
            console.log("Not logged In");
            navigate("/login");
        } else {
            console.log("Logged In");
        }
    }, []);
};

export default useLoggedIn;
