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
import Reports from "./components/Dashboard/Reports";
import DetailReports from "./components/Dashboard/DetailReports";

export default ({ childProps }) => (
	<main>
		<Switch>
			<AppliedRoute path='/' component={SignInSide} exact props={childProps} />
			<PrivateRoute path='/dashboard' component={Dashboard}  props={childProps} />
			<PrivateRoute path='/products' component={Products}  props={childProps} />
			<PrivateRoute path='/customers' component={Customers}  props={childProps} />
			<PrivateRoute path='/transations' component={Transation}  props={childProps} />
			<PrivateRoute path='/reports' component={Reports}  props={childProps} />
			<PrivateRoute path='/detail_report/:id' component={DetailReports}  props={childProps} />
			<AppliedRoute path='/logout' component={Logout}  props={childProps} />
		</Switch>
	</main>
);