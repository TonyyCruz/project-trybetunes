import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateInput extends Component {
  render() {
    const { name, type, description, funct, test, value } = this.props;

    return (

      <label htmlFor={ name }>
        <input
          className="input"
          name={ name }
          type={ type }
          placeholder={ description }
          onChange={ funct }
          data-testid={ test }
          value={ value }
        />
      </label>

    );
  }
}

CreateInput.defaultProps = {
  test: '',
};

CreateInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
  test: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default CreateInput;
