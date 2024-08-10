import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";

const App = () => {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product" element={<Product />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/app" element={<AppLayout />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	)
}
export default App;
