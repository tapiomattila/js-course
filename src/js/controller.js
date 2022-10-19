import * as model from './model';
import recipeView from './views/recipeView'

// import icons from '../img/icons.svg'; // Parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(err);
    recipeView.renderError();
    // alert(err);
  }
}
// controlRecipes();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();

