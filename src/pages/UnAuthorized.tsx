import { Link } from "react-router";

const UnAuthorized = () => {
    return (
        <div>
            <h1>You are not Authorized</h1>
            <Link className="link" to={"/"}>Home</Link>
        </div>
    );
};

export default UnAuthorized;