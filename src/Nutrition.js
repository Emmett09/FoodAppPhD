import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

class Nutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutrients: null,
      current_page: 1,
      max_page: null,
      id: this.props.match.params._id
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
        `https://www.vmh.life/_api/nutritiondata/?page=${pageNumber}&product_type=${this.state.id}`
      )
      .then((res) => {
        this.setState({
          nutrients: res.data.results,
          isLoading: false,
          current_page: pageNumber,
          max_page: Math.ceil(res.data.count / 50)
        });
      });
  };

  handleClick(nutrientVal) {
    //do adding of item here this is the row user clicked
    console.log(nutrientVal);
  }

  render() {
    let nutrients;

    if (this.state.nutrients !== null) {
      nutrients = this.state.nutrients.map((nutrientVal) => (
        <tr
          onClick={() => this.handleClick(nutrientVal)}
          style={{ cursor: "pointer" }}
          key={nutrientVal.nutrient_id}
        >
          <td>{nutrientVal.name}</td>
          <td>{nutrientVal.short_desc}</td>
        </tr>
      ));
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Nutrient Value</th>
            </tr>
          </thead>
          <tbody>{nutrients}</tbody>
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
        </div>
      </div>
    );
  }
}

export default Nutrition;
