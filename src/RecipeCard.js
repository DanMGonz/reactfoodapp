import React, { Component } from "react";
import FindRecipeInfoApi from "./RecipeInfoApi";
import FetchData from "./FoodApi";
import RecipeCardInfo from "./RecipeCardInfo";
import Popup from "reactjs-popup";
import "./App.css";
import "./fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      RecipeInfoResult: {},
      isrecipeCardClicked: false
    };
    // create a ref to store the RecipeComponent DOM element
    this.recipeCardInfoComponentref = React.createRef();
    this.scrollIntoViewCardInfoComponent = this.scrollIntoViewCardInfoComponent.bind(
      this
    );

    //Popup function binding
    this.handlePopUpClose = this.handlePopUpClose.bind(this);
  }
  //set clicked flag back to false: for popup
  handlePopUpClose() {
    this.setState({ isrecipeCardClicked: false });
  }
  scrollIntoViewCardInfoComponent() {
    // Explicitly focus component using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.recipeCardInfoComponentref.current.scrollIntoView();
  }
  //added popp up, opens when the state is clicked
  makeRecipeCardInfo() {
    return (
      <div>
        <Popup
          modal={true}
          open={this.state.isrecipeCardClicked}
          position="right center"
          onClose={this.handlePopUpClose}
        >
          <div>
            <RecipeCardInfo RecipeInfoData={this.state.RecipeInfoResult} />
          </div>
        </Popup>
      </div>
    );
  }
  handleRecipeSearch(id) {
    // alert(id);

    this.setState({ isrecipeCardClicked: true });
    //find ingredients using API
    let RecipeInstruction = new FindRecipeInfoApi({ RecipeID: id });
    //redundant but I ned to be surea
    RecipeInstruction.setRecipeID(id);
    RecipeInstruction.PrepareQueryString();
    let queryURL = RecipeInstruction.GetQuery();
    let findRecipeInfoResponse = FetchData(queryURL);

    findRecipeInfoResponse.then(response => {
      this.setState({ RecipeInfoResult: response.data });

      //put the make RecipeCardINfo method here if you want to include this on event
    });

    //for conditional rendering we can also do the same thig for clear to toggle it back to false

    //scroll up on card info component
    this.scrollIntoViewCardInfoComponent();
  }
  render() {
    let recipeCardClicked = this.state.isrecipeCardClicked;
    console.log(recipeCardClicked);
    let recipeInfoCard;
    const cardElements = [];

    Object.entries(this.props.RecipeResultObjects).forEach(entry => {
      let key = entry[0];
      let value = entry[1];

      //note we have to bind the click event
      //see https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method

      cardElements.push(
        <div className="recipeCardMain">
          <div key={key} className="recipeCardKey">
            <div className="ft-recipe">
              <div class="ft-recipeTitleParent">
                <span id="close-modal">
                  <i />
                </span>
                <span className="recipeTitleWrap">
                  <h2 class="recipeTitle">{value.title}</h2>
                </span>
              </div>
              <div class="ft-recipe__content">
                <img src={value.image} alt={value.title} />
                <hr />
                <div class="user-rating" />
                <ul class="recipe-details">
                  <li class="recipe-details-itemUsed">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="2x"
                      style={{ color: "#06603A" }}
                    />
                    <span class="value">{value.usedIngredientCount}</span>
                    <div class="title">Used </div>
                  </li>
                  <li class="recipe-details-itemMissed">
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size="2x"
                      style={{ color: "#06603A" }}
                    />
                    <span class="value">{value.missedIngredientCount}</span>
                    <div class="title">Missed </div>
                  </li>
                  <li class="recipe-details-itemPopularity">
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2x"
                      style={{ color: "#06603A" }}
                    />
                    <span class="value">{value.likes}</span>
                    <div class="title">likes</div>
                  </li>
                </ul>
                {/* <p class="description">
                  There’s no better way to celebrate May being National
                  Strawberry Month than by sharing a sweet treat with your
                  pup!!! Strawberries...
                </p> */}
                <footer class="content__footer">
                  <div onClick={this.handleRecipeSearch.bind(this, value.id)}>
                    View Recipe
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      );
    });

    if (recipeCardClicked) {
      recipeInfoCard = this.makeRecipeCardInfo();
      console.log(recipeInfoCard);
    }

    return (
      <div>
        <div ref={this.recipeCardInfoComponentref}>
          <div>{recipeInfoCard}</div>
        </div>

        <div>{this.props.RecipeResultObjects.title}</div>

        <div className="recipeCardContainer">{cardElements}</div>
      </div>
    );
  }
}

export default RecipeCard;
