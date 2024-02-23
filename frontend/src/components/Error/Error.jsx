import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import "./Error.scss";
import error404 from "/images/error404.png";

const Error = () => {
  const error = useRouteError();
  return (
    <div>
      <main className="main_container">
        <div style={{ textAlign: "center" }}>
          <div>
            <img className="error-image" src={error404} alt="Error" />
            <p className="error-status">{error.status}</p>
            <h1 className="error-heading">Oops! {error.statusText}</h1>
            <p className="error-text">{error.data}</p>
            <div className="link-container">
              <Link to={"/"} className="link">
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;
