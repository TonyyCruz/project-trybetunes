import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateButton extends Component {
  render() {
    const { name, description, funct, test, btnDisable } = this.props;

    return (

      <label htmlFor={ name }>
        <button
          name={ name }
          type="button"
          onClick={ funct }
          data-testid={ test }
          disabled={ btnDisable }
        >
          { description }
        </button>
      </label>

    );
  }
}

CreateButton.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
  btnDisable: PropTypes.bool.isRequired,
};

export default CreateButton;
