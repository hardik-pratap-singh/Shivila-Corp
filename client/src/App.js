
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Status from "./components/Status"
// import axios from 'axios' 
import Home from "./components/Home";
function App() {

	

	// console.log(products); 

	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" Component={Home} />
					<Route exact path='/Status' Component={Status}  ></Route>
				</Routes>
			</Router>
		</>


	);
}

export default App;
