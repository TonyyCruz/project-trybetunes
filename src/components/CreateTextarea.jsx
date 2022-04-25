import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateTextarea extends Component {
  render() {
    const { name, description, funct, test, value } = this.props;

    return (

      <label htmlFor={ name }>
        <textarea
          className="input"
          name={ name }
          placeholder={ description }
          onChange={ funct }
          data-testid={ test }
          value={ value }
        />
      </label>

    );
  }
}

CreateTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CreateTextarea;
