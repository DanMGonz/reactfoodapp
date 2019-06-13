import React, { Component } from "react";
import FindIngredientApi from "./findIngredientApi";
import FetchData from "./FoodApi";
import RecipeCard from "./RecipeCard";
import "./fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      IngredientInput: "",
      RecipeResultList: {},
      isCleared: false,
      isSubmitted: false,
      isHealthyFilter: false,
      isAdvancedSearch: false,
      FindIngredientApiOptionalNumber: "",
      FindIngredientApiOptionalRanking: "",
      isToggleOn: true
    };

    this.IngredientsList = [];
    this.ListElements = Object;

    // create a ref to store the RecipeCard DOM element
    this.RecipeCardComponentRef = React.createRef();
    this.scrollIntoRecipeCardComponent = this.scrollIntoRecipeCardComponent.bind(
      this
    );

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleClearSubmit = this.handleClearSubmit.bind(this);

    //advance search
    this.handleFindIngredientApiOptionalRank = this.handleFindIngredientApiOptionalRank.bind(
      this
    );
    this.handleFindIngredientApiOptionalNumber = this.handleFindIngredientApiOptionalNumber.bind(
      this
    );
    this.handleAdvancedSearchChange = this.handleAdvancedSearchChange.bind(
      this
    );

    //handle toggle switches
    this.handleAdvanceSearchToggle = this.handleAdvanceSearchToggle.bind(this);
    this.handleHealthyFilter = this.handleHealthyFilter;
  }

  handleFindIngredientApiOptionalRank(event) {
    this.setState({ FindIngredientApiOptionalRanking: event.target.value });
  }

  handleFindIngredientApiOptionalNumber(event) {
    this.setState({ FindIngredientApiOptionalNumber: event.target.value });
  }
  handleAdvancedSearchChange() {
    //toggle advanced search flat
    if (this.state.isAdvancedSearch) {
      this.setState({ isAdvancedSearch: false });
    } else {
      this.setState({ isAdvancedSearch: true });
    }
    
  }
  handleAdvanceSearchToggle(isAdvancedSearch) {
    this.setState({ isAdvancedSearch });
  }
  scrollIntoRecipeCardComponent() {
    // Explicitly focus component using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.RecipeCardComponentRef.current.scrollIntoView();
  }

  //pass in RecipeResultObjects JSON
  //create
  makeRecipeCards() {
    return (
      <div>
        <RecipeCard
          IngredientList={this.state.IngredientInput}
          RecipeResultObjects={this.state.RecipeResultList}
        />
      </div>
    );
  }
 
  onAdvancedSearchOn() {
    this.setState(prevState => ({
      isAdvancedSearch: !prevState.isAdvancedSearch
    }));
  }

  handleClearSubmit(event) {
    this.setState({ isSubmitted: false });
    this.setState({ isCleared: true });
    this.setState({ value: "" });
    this.setState({isAdvancedSearch:false});
    document.getElementById("plus-toggle").checked = false;

  }
  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  handleInputSubmit(event) {
    //search / clear button toggle
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

    //raise submitted flag
    this.setState({ isCleared: false });
    this.setState({ isSubmitted: true });

    //process input
    this.IngredientsList = this.state.value.trim().split(" ");

    /**
     * Find Ingredient using API
     */
    let FindIngredient = new FindIngredientApi({
      ingredients: this.IngredientsList
    });
    FindIngredient.setOptionalParamNumber(
      this.state.FindIngredientApiOptionalNumber,
      this.state.FindIngredientApiOptionalRanking
    );
    FindIngredient.PrepareQueryString(this.IngredientsList);

    let apiURL = FindIngredient.GetQuery();

    //Set state --test only ;we can probably remove this
    this.setState({ IngredientInput: apiURL });

    //Fetch Data Using the using FetchData
    //pass the Url and auth token in paramater
    let resp = FetchData(apiURL);

    resp.then(result => {
      this.setState({ RecipeResultList: result.data });
    });

    //error handling
    resp.catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

    //scroll  down into result
    this.scrollIntoRecipeCardComponent();
    event.preventDefault();
  }

  render() {
    let renderRecipeCards;
    let renderAdvancedSearch;
    const submittedSearch = this.state.isSubmitted;
    const ClearSearch = this.state.isCleared;
    console.log("submitted search:" + submittedSearch);
    console.log("clear:" + ClearSearch);
    if (submittedSearch && !ClearSearch) {
      console.log("here");
      renderRecipeCards = this.makeRecipeCards(this.state.IngredientInput);
    }

    if (this.state.isAdvancedSearch) {
      renderAdvancedSearch = (
        <div className="advancedSearchOptionsParent">
          <form>
            <input
              type="text"
              value={this.state.FindIngredientApiOptionalNumber}
              onChange={this.handleFindIngredientApiOptionalNumber}
              placeholder="The maximum number of recipes to return."
              className="advancedSearchOptions"
            />
          </form>

          <form>
            <input
              type="text"
              value={this.state.FindIngredientApiOptionalRanking}
              onChange={this.handleFindIngredientApiOptionalRank}
              placeholder="Whether to maximize used ingredients (1) or minimize missing ingredients (2) first."
              className="advancedSearchOptions"
            />
          </form>
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleInputSubmit} className="form-parent">
          <div class="plus-toggle" onChange={this.handleAdvancedSearchChange} title="Advanced search">
            <input type="checkbox" id="plus-toggle" />
            <label for="plus-toggle" />
          </div>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange}
            placeholder="Search by ingredients: apple flour cane sugar"
            className="form-control search-bar"
          />

          {this.state.isToggleOn ? (
            <button className="search-icon" type="submit">
              <FontAwesomeIcon
                icon={faSearch}
                size="2x"
                style={{ color: "#06603A" }}
              />
            </button>
          ) : (
            <button onClick={this.handleClearSubmit} className="clear-icon">
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                style={{ color: "#06603A" }}
              />
            </button>
          )}
        </form>

        
        {renderAdvancedSearch}

        <div className="containerParent">
            {renderRecipeCards}
            <div ref={this.RecipeCardComponentRef} />
          </div>
        </div>
    );
  }
}

export default Search;
