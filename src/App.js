import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import FoodCat from "./FoodCat";
import FoodItems from "./FoodItems";
import Nutrition from "./Nutrition";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      foodCat: [],
      isLoading: false
    };
  } //end constructor

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get(`https://www.vmh.life/_api/foodgroups`).then((res) => {
      console.log(res.data.results);
      this.setState({
        foodCat: res.data.results,
        isLoading: false
      });
    });
  }

  render() {
    let content;
    if (this.state.isLoading) {
      content = <h1>Loading...</h1>;
    } else if (this.state.foodCat.length > 0) {
      content = this.state.foodCat.map((cat) => (
        <Link to={`/foods/${cat.description}`}>
          <FoodCat key={cat.code} foodCat={cat} />
        </Link>
      ));
    } else {
      content = <h4>No food categorys found!</h4>;
    }
    return (
      <Router>
        <div>
          <Route path="/foods/:_id" component={FoodItems} />
          <Route exact={true} path="/" render={() => content} />

          <Route path="/nutritiondata/:_id" component={Nutrition} />
          <Route exact={true} path="/Nutrition" render={() => content} />
        </div>
      </Router>
    );
  }
}

export default App;
