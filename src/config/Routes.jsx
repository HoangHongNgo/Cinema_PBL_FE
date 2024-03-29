import React from "react";

import { Route, Switch } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Blog from "../pages/blog/Blog";
import Home from "../pages/Home";
import { Login } from "../components/login/login";
import { Register } from "../components/register/register";
import Buy_ticket from "../components/BuyTicket/Buy_ticket";
import Bookingticket from "../pages/bookingticket/Bookingticket";
import History from "../pages/historybuy/History";

const Routes = () => {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/buyticket" component={Buy_ticket} />
      <Route path="/booking/:id" component={Bookingticket} />
      <Route
        path="/category/:status/search/:keyword"
        exact
        component={Catalog}
      />
      <Route path="/category/:status" exact component={Catalog} />
      <Route path="/detail/:id" exact component={Detail} />
      <Route path="/blog" component={Blog} />
      <Route path="/history" component={History}/>
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
