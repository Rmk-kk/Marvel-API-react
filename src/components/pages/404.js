import { Link } from "react-router-dom";
import ErrorMessage from "../error/error";

const Error404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'text-align' : 'center'}}>Page doesn't exist</p>
            <Link to="/">Back to main page</Link>
        </div>
    )
}

export default Error404;