import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';

/**
 * Renders that hacker-ish button.
 */
const Button = ({className, onClick, children}) => (
	<button
		onClick={onClick}
		className={[styles.button, className].join(' ')}
	>
		{children}
	</button>
);


Button.propTypes = {

	/**
	 * Optional class name for out element
	 */
	className: PropTypes.string,

	/**
	 * Buttons click handler
	 */
	onClick: PropTypes.func,

	/**
	 * Button's inner content
	 */
	children: PropTypes.node

};


export default Button;