import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './recipe_preview.css';
import { closeModal } from '../../actions/modal_actions';

const RecipePreview = props => {
  const { currentRecipe, closeModal } = props;

  return (
    <>
      <img className="rpm-img" src={currentRecipe.image} alt="recipe-img" />

      <table className="rmp-infoStats">
        <tbody>
          <tr>
            <td>
              <h4>Servings</h4>
              <p>{currentRecipe.servings}</p>
            </td>
            <td>
              <h4>Total time</h4>
              <p>{currentRecipe.time.total}</p>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>{currentRecipe.name}</h3>

      <ul className="rpm-ingredientsList">
        {currentRecipe.ingredients.map((ingredient) => (
          <li key={ingredient._id}>{ingredient.fullName}</li>
        ))}
      </ul>
    
      <div className="rpm-navLinks">
        <Link to={`/recipes/${currentRecipe._id}`} onClick={() => closeModal()}>
          View Recipe
        </Link>
        <button>
          Pin Recipe
        </button>
      </div>
    </>
  );
}

const mSTP = ({ ui: { modal }}) => ({
  currentRecipe: modal.data,
})

const mDTP = dispatch => ({
  pinRecipe: recipeId => dispatch(pinRecipe(recipeId)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(mSTP, mDTP)(RecipePreview);