import { Switch, Route } from "react-router-dom";
import { Login, Home } from "./components";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
