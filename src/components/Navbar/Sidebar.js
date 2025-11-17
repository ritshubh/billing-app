import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons";
// import { getUserInfo } from "../localStorage";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	// const { fname } = getUserInfo();
	const [sidebar, setSidebar] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);
	const isAdmin = true;
	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="navbar">
					<NavLink to="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} />
					</NavLink>

					<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
						<div className="nav-menu-items" onClick={showSidebar}>
							<div className="navbar-toggle">
								<NavLink to="#">
									<i
										class="fa fa-close pr-2"
										aria-hidden="true"
										style={{ color: "#fff" }}
									></i>
								</NavLink>
							</div>

							<div>
								{true ? (
									<div className="nav-text sideBarItemsName">
										<NavLink to="/userprofile">
											<FaIcons.FaUser />
											<span>Shubh</span>
										</NavLink>
									</div>
								) : (
									<div className="nav-text sideBarItemsName">
										<NavLink to="/signin">
											<FaIcons.FaUser />
											<span>Signin</span>
										</NavLink>
									</div>
								)}
							</div>

							{SidebarData.map((item, index) => {
								return (
									<div key={index} className={item.cName}>
										<NavLink
											to={item.path}
											className="sideBarItemsName"
										>
											{item.icon}
											<span>{item.title}</span>
										</NavLink>
									</div>
								);
							})}
							{isAdmin && (
								<div className="nav-text sideBarItemsName">
									<NavLink to="/adminPage">
										<FaIcons.FaUser />
										<span>Admin Page</span>
									</NavLink>
								</div>
							)}
						</div>
					</nav>
				</div>
			</IconContext.Provider>
		</>
	);
};

export default Sidebar;
