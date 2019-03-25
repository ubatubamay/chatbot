import React from 'react';
import PropTypes from 'prop-types';

import '../../app.scss';
import './style.scss';

import Widget from '../Widget';

const PresentationLayout = props => (
  <div>
    <div className={`stars large`}></div>
    <div className={`stars medium`}></div>
    <div className={`stars small`}></div>
    {/* <div className={`presentationTitle`}>Bem-vindo ao Milliways!</div>
    <div className={`presentationSubTitle`}>O restaurante no fim do unverso</div> */}
    <Widget socket={props.socket}/>
  </div>
);

PresentationLayout.propTypes = {
  welcomeText: PropTypes.string
};

export default PresentationLayout;
