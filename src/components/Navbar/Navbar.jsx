import React from "react";
import Sidebar from "./Sidebar";
import { NavLink, useLocation } from "react-router-dom";
import ".././../css/Navbar.css";

const Navbar = () => {
	const location = useLocation();
	const hideFooterRoutes = ["/concertPage"];
	const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
	return (
		<div className="d-flex justify-content-between navbar-div">
			<div className="px-4 app-name-div">
				<NavLink to="/">
					<span className="app-name">Flikk</span>
				</NavLink>
			</div>
			<div className="d-flex align-items-center px-3">
				<div className="hamburger">
					<Sidebar />
				</div>
			</div>
		</div>
	);
};
export default Navbar;
