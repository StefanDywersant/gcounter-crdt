import React from 'react';
import PropTypes from 'prop-types';
import styles from './Bean.scss';

/**
 * Renders single bean
 */
const Bean = ({slideX, slideY}) => (
	<div
		className={styles.bean}
		style={{
			marginTop: Math.floor(slideY * 5) + 'px',
			marginLeft: Math.floor(slideX * 5) + 'px'
		}}
	/>
);


Bean.defaultProps = {
	slideX: 0,
	slideY: 0
};


Bean.propTypes = {

	/**
	 * Horizontal slide of bean (0-1)
	 */
	slideX: PropTypes.number,

	/**
	 * Vertical slide of bean (0-1)
	 */
	slideY: PropTypes.number

};


export default Bean;