import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import UploadReel from "./pages/UploadReel";
import ConcertPage from "./pages/ConcertPage";
import AddCompetition from "./pages/AddCompetition";

function App() {
	const location = useLocation();
	const hideFooterRoutes = ["/concertPage"];
	const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
	return (
		<div className="text-center">
			<Navbar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/uploadReel" exact element={<UploadReel />} />
				<Route path="/concertPage" exact element={<ConcertPage />} />
				<Route path="/adminPage" exact element={<AddCompetition />} />
			</Routes>
			{!shouldHideFooter && <Footer />}
		</div>
	);
}

export default App;
