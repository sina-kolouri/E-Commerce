import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div>
        Page not found. Go to{" "}
        <Link to="/" replace>
          homepage
        </Link>
        .
      </div>
    </div>
  );
};

export default NotFound;
