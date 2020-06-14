import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";

function App() {
	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/sign-up" component={SignUp} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;
