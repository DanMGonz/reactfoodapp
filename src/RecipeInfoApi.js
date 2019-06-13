
class FindRecipeInfoApi {
    constructor(RecipeID,includeNutrition=false){
      this.RecipeID = RecipeID;
      this.includeNutrition = includeNutrition;
      this.APIURL  = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.RecipeID}/information`;
      this.query ='';
    }
    /*Takes in JSON object and to set optional prameters*/ 
    setOptionalParam(FindRecipeInfoApi){
      this.ingredients = FindRecipeInfoApi.includeNutrition;
    }

    setRecipeID(RecipeID){
        this.RecipeID = RecipeID;
    }
    getRecipeID(){
        return this.getRecipeID;
    }
    /* takes Ingredient list array and set the query string*/
    PrepareQueryString(){
      this.query = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.RecipeID}/information`;
      return this.query;
    }
   
    GetQuery()
    {
      return this.query;
    }

  } 



    export default  FindRecipeInfoApi