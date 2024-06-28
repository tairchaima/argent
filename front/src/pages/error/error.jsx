import { Link } from "react-router-dom";
import "../../styles/pages/error.css";

function Error404() {
  return (
    <main className="error-404">
      <div className="borderError">
        <h1 className="error-404_h1">404</h1>
        <p className="error-404_p">
          Oops! The page you are requesting <span>does not exist.</span>
        </p>

        <Link
          to="/"
          className="error-404_a"
        >
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}

export default Error404;
