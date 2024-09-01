import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/FakeAuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {navigate("/", { replace: true });
	  }
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
