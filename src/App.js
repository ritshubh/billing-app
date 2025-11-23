import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import ItemManagement from "./screen/ItemManagement";
import Invoice from "./screen/Invoice";
import { Route, Routes } from "react-router-dom";
import AddInvoice from "./screen/AddInvoice";

function App() {
	return (
		<div className="App">
			<div>navbar</div>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/ItemManagement" element={<ItemManagement />} />
				<Route path="/Invoice" element={<Invoice />} />
				<Route path="/add-invoice" element={<AddInvoice />} />
			</Routes>
			<div>footer</div>
		</div>
	);
}

export default App;
