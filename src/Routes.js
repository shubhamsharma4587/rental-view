import React from 'react';
import { Switch } from 'react-router-dom';
import SignInSide from './components/SignInSide';
import Dashboard from './components/Dashboard/Dashboard';
import AppliedRoute from './components/AppliedRoute';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Products from "./components/Dashboard/Products";
import Customers from "./components/Dashboard/Customers";
import Transation from "./components/Dashboard/Transation";

export default ({ childProps }) => (
	<main>
		<Switch>
			<PrivateRoute path='/dashboard' component={Dashboard}  props={childProps} />
			<PrivateRoute path='/products' component={Products}  props={childProps} />
			<PrivateRoute path='/customers' component={Customers}  props={childProps} />
			<PrivateRoute path='/transations' component={Transation}  props={childProps} />
			<PrivateRoute path='/reports' component={Dashboard}  props={childProps} />
			<AppliedRoute path='/logout' component={Logout}  props={childProps} />
			<AppliedRoute path='/' component={SignInSide} props={childProps} />
		</Switch>
	</main>
);