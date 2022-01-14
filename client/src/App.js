//Import node components
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageFooter from "./components/PageFooter/PageFooter";
import PageHeader from "./components/PageHeader/PageHeader"
import Activity from "./pages/Activity/Activity";
import Personality from "./pages/Personality/Personality"

function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Switch>
          <Route path="/" exact component={Activity} /> 
          <Route path="/activity" exact component={Activity} /> 
          <Route path="/user/personality" exact component={Personality} /> 
          {/* <Route path="/schedule" exact component={Schedule} />  */}
          {/* <Route path="/confirmation" exact component={Confirmation} />  */}
      </Switch>
      <PageFooter />
    </BrowserRouter>
  );
}

export default App;
