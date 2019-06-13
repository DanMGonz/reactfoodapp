//import axios from 'axios';
class FindIngredientApi{
    constructor(ingredients,number=7,ranking=1,ignorePantry=false){
      this.ingredients = ingredients;
      this.number = number;
      this.ranking = ranking;
      this.ignorePantry = ignorePantry;
      this.APIURL  = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?';
      this.query ='';
    //  this.responseData = {};
    }
    setOptionalParamNumber(num,rank=1){
      this.number = num;
      this.ranking = rank;
    }
    /*Takes in JSON object and to set optional prameters*/ 
    setOptionalParam(FindIngredientApi){
      this.ingredients = FindIngredientApi.ingredients;
      this.number = FindIngredientApi.number;
      this.ranking = FindIngredientApi.ranking;
      this.ignorePantry = FindIngredientApi.ignorePantry;
    }
    /*Takes in IngredientList and and parse into string*/
    parseArrayInput(ingredientList){
      let ingredientParam = '';
      ingredientList.forEach(element => {
        ingredientParam = ingredientParam + '%2C' + element;
        //console.log(ingredientParam);
      });
      
      return ingredientParam;
    }
   // setIngredientParam(ingredientList){
   //   this.ingredients = this.parseArrayInput(ingredientList);
   // }
  
    /* takes Ingredient list array and set the query string
    * returns full API query URL string 
    */
    PrepareQueryString(ingredientList){
      this.ingredients = this.parseArrayInput(ingredientList)
      this.query =`${this.APIURL}number=${this.number}&ranking=${this.number}&ignorePantry=${this.ignorePantry}&ingredients=${this.parseArrayInput(ingredientList)}`;
      return this.query;
    }
   
    GetQuery()
    {
      return this.query;
    }
 
  }

  export default FindIngredientApi