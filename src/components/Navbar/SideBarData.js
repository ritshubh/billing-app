import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";

// import { getUserInfo } from '../localStorage';
// const { name, isAdmin } = getUserInfo();

export const SidebarData = [
	{
		title: "Home",
		path: "/",
		icon: <AiIcons.AiFillHome />,
		cName: "nav-text",
	},
	// {
	// 	title: "About",
	// 	path: "/aboutus",
	// 	icon: <IoIcons.IoMdPeople />,
	// 	cName: "nav-text",
	// },
	{
		title: "Contact",
		path: "/contact",
		icon: <FaIcons.FaEnvelopeOpenText />,
		cName: "nav-text",
	},
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <MdIcons.MdDashboard />,
		cName: "nav-text",
	},
	{
		title: "Concert Page",
		path: "/concertPage",
		icon: <i class="fa fa-star-o" aria-hidden="true"></i>,
		cName: "nav-text",
	},
];
