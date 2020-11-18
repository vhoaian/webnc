import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Welcome from "./components/home/Welcome";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Board from "./components/board";
import NewBoard from "./components/board/NewBoard";
import Header from "./components/shared/Header";
import authService from "./services/authService";
import Profile from "./components/profile";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  return (
    <React.Fragment>
      <Header user={user} />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/board/new" component={NewBoard} />
        <Route path="/board/:id" component={Board} />
        <Route path="/" component={user ? Home : Welcome} />
      </Switch>
    </React.Fragment>
  );
}
