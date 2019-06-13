import React, { Component } from "react";
import Iframe from "react-iframe";

class RecipeCardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  componentDidMount() {}

  render() {
    this.responseData = this.props.RecipeInfoData;
    //ref={this.recipeCardInfoComponentref}

    //removed instructions, can add it back later if needed
    // <h3 className="card-title" >Instructions:</h3>
    //<p className="card-text">{this.responseData.instructions}</p>

    return (
      <div>
        <Iframe
          url={this.responseData.sourceUrl}
          width="100%"
          height="640px"
          overflow="auto"
          loading="..."
          display="initial"
          position="inherit"
          referrerpolicy="no-referrer"
        />
      </div>
    );
  }
}

export default RecipeCardInfo;
