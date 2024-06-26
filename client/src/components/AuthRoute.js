import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
    if (!localStorage.token) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default AuthRoute;
