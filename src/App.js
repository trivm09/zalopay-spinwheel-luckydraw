import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpinWheel from "./components/SpinWheel";
import Registration from "./components/Registration";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Registration />} />
					<Route path="/spin-wheel" element={<SpinWheel />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
