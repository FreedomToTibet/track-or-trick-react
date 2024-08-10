import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Home from "./pages/Home"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"

const App = () => {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product" element={<Product />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	)
}
export default App
