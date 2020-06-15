import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";
import Dashboard from "../src/components/Dashboard";

function App() {
	return (
		<React.Fragment>
			<Router>
				{checkIfSignedIn()}
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/sign-up" component={SignUp} />
					<ProtectedRoute exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

function ProtectedRoute({ component: Component, ...rest }) {
	if (localStorage.getItem("signedIn") !== "yes") {
		return <Redirect to="/" />;
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
}

function checkIfSignedIn() {
	if (localStorage.getItem("signedIn") === "yes")
		return <Redirect to="/dashboard" />;
}

export default App;
