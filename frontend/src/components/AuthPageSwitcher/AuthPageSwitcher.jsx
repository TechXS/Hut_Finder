import "./AuthPageSwitcher.css";
import {NavLink, useLocation} from "react-router-dom";

const AuthPageSwitcher = ({layout}) => {
    const location = useLocation();

    return (
        <div>
            <nav>
                <NavLink
                    to={`/auth/${layout.toLowerCase()}/landlord`}
                    exact="true"
                    className={({isActive}) =>
                        isActive &&
                        location.pathname === `/auth/${layout.toLowerCase()}/landlord`
                            ? "link-active"
                            : "link"
                    }
                >
                    Landlord?
                </NavLink>
                <NavLink
                    to={`/auth/${layout.toLowerCase()}/client`}
                    exact="true"
                    className={({isActive}) =>
                        isActive &&
                        location.pathname === `/auth/${layout.toLowerCase()}/client`
                            ? "link-active"
                            : "link"
                    }
                >
                    Client?
                </NavLink>
            </nav>
        </div>
    );
};

export default AuthPageSwitcher;
