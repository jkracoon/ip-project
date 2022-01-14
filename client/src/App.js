//Import node components
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageFooter from "./components/PageFooter/pagefooter";
import PageHeader from "./components/PageHeader/pageheader"
import Activity from "./pages/Activity/activity";
import Personality from "./pages/Personality/personality"


function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Switch>
          <Route path="/" exact component={Activity} /> 
          <Route path="/activity" exact component={Activity} /> 
          <Route path="/personality" component={Personality} /> 
          {/* <Route path="/schedule" exact component={Schedule} />  */}
          {/* <Route path="/confirmation" exact component={Confirmation} />  */}
      </Switch>
      {/* <PageFooter /> */}
    </BrowserRouter>
  );
}

export default App;
