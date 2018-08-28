import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styles from './Beans.scss';


/**
 * Renders beans list
 */
const Beans = ({children, className}) => (
	<ul className={[styles.beans, className].join(' ')}>
		{Children.map(
			children,
			child => <li>{child}</li>
		)}
	</ul>
);


Beans.propTypes = {

	/**
	 * Optional class name for outer element
	 */
	className: PropTypes.string

};


export default Beans;