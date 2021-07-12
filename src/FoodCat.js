import React from "react";

function FoodCat(props) {
  const { code, description } = props.foodCat;
  return (
    <div a>
      <p>Code: {code}</p>
      <p>Description: {description}</p>
      <hr className="banner-text hr" />
    </div>
  );
}

export default FoodCat;
