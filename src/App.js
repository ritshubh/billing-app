import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";

function App() {
	return (
		<div className="App">
			<div>navbar</div>
			<div>
				<HomeScreen />
			</div>
			<div>footer</div>
		</div>
	);
}

export default App;
