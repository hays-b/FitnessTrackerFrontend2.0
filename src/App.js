import { Switch, Route} from "react-router-dom";
import { Login } from "./components"

function App() {
  return (
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
      </Switch>

  );
}

export default App;
