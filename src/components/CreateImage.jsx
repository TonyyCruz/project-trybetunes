import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/style.css';

class CreateImage extends Component {
  render() {
    const { name, type, description, funct, test, value } = this.props;

    return (

      <div>
        <input
          className="profile-image"
          name={ name }
          type={ type }
          placeholder={ description }
          onChange={ funct }
          data-testid={ test }
          value={ value }
        />
      </div>

    );
  }
}

CreateImage.defaultProps = {
  test: '',
};

CreateImage.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
  test: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default CreateImage;
