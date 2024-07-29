import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateActivity from "./components/CreateActivity/CreateActivity.jsx";
import Detail from "./components/Detail/Detail.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/activities" component={CreateActivity} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
