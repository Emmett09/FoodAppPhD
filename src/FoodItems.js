import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
//import { BrowserRouter as Router, Link, Route } from "react-router-dom";

//added this
// import Nutrition from "./Nutrition";
//to here

class FoodItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: null,
      current_page: 1,
      max_page: null,
      id: this.props.match.params._id

      //added this
      // nutInf: [],
      // isLoading: false
      // to here
    };
    //this.emptyDietArray = this.emptyDietArray.bind(this);
  } //end constructor

  componentDidMount() {
    let history = useHistory;
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async (pageNumber) => {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://www.vmh.life/_api/foods/?page=${pageNumber}&product_type=${this.state.id}`
      )
      .then((res) => {
        this.setState({
          foods: res.data.results,
          isLoading: false,
          current_page: pageNumber,
          max_page: Math.ceil(res.data.count / 50)
        });
      });
  };

  handleClick(foodItem) {
    //do adding of item here this is the row user clicked
    console.log(foodItem);
  }

  render() {
    let foods;

    if (this.state.foods !== null) {
      foods = this.state.foods.map((foodItem) => (
        <tr
          onClick={() => this.handleClick(foodItem)}
          style={{ cursor: "pointer" }}
          key={foodItem.food_id}
        >
          <td>{foodItem.name}</td>
          <td>{foodItem.short_desc}</td>
        </tr>
      ));
    }

    //added this
    // let content;
    // if (this.state.isLoading) {
    //   content = <h1>Loading...</h1>;
    // } else if (this.state.nutInf.length > 0) {
    //   content = this.state.nutInf.map((inf) => (
    //     <Link to={`/nutritiondata/${inf.description}`}>
    //       <Nutrition key={inf.code} nutInf={inf} />
    //     </Link>
    //   ));
    // } else {
    //   content = <h4>No nutritional information found!</h4>;
    // }
    //to here

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Food Item - Click to add to diet</th>
            </tr>
          </thead>
          <tbody>{foods}</tbody>
        </table>

        <div className="Pag">
          <button
            disabled={this.state.current_page - 1 === 0}
            onClick={() =>
              this.makeHttpRequestWithPage(this.state.current_page - 1)
            }
          >
            prev
          </button>
          <button
            disabled={this.state.current_page + 1 === this.state.max_page}
            onClick={() =>
              this.makeHttpRequestWithPage(this.state.current_page + 1)
            }
          >
            next
          </button>
        </div>

        <div className="returnToMain">
          <button className="fooBarClass" onClick={() => history.back()}>
            Back
          </button>

          {/* added this */}
          {/* <Router>
            <div>
              <Route path="/nutrients/:_id" component={Nutrition} />
              <Route exact={true} path="/Nutrition" render={() => content} />
            </div>
          </Router> */}
          {/* to here */}
        </div>
      </div>
    );
  }
}

export default FoodItems;
