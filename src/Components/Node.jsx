import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Beans from './Beans';
import Bean from './Bean';
import Button from './Button';
import styles from './Node.scss';


/**
 * Renders bean counter node.
 */
class Node extends Component {

	/**
	 * Constructor
	 * @param {{total: number, onIncrementClick: function}} props Component's properties
	 */
	constructor(props) {
		super(props);
		this.state = {
			beans: []
		};
	}

	/**
	 * Current bean socket absolute position.
	 * @returns {{x: number, y: number}|null}
	 */
	get socketPosition() {
		if (!this.el) {
			return null;
		}

		const box = this.el.getBoundingClientRect();

		const body = document.body;

		const clientTop = body.clientTop || 0;
		const clientLeft = body.clientLeft || 0;

		const top  = box.top +  window.pageYOffset - clientTop;
		const left = box.left + window.pageXOffset - clientLeft;

		return {
			y: Math.round(top + 10),
			x: Math.round(left + 20)
		};
	}

	/**
	 * Invoked before component receives props.
	 * @param {object} nextProps New properties
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.total !== this.state.beans.length) {
			// recalculate beans position in order to trigger "bean push" animation
			this.setState({
				beans: new Array(nextProps.total)
					.fill(0)
					.map(() => ({slideX: Math.random(), slideY: Math.random()}))
			});
		}
	}

	/**
	 * Renders node box to DOM.
	 * @returns {XML}
	 */
	render() {
		return <div
			className={[styles.container, this.props.className].join(' ')}
			ref={el => this.el = el}
		>
			<Beans className={styles.beans}>
				{this.state.beans.map((bean, i) => <Bean key={i} {...bean} />)}
			</Beans>

			<p className={styles.total}>
				Total: <strong>{this.props.total}</strong>
			</p>

			<Button
				className={styles.button}
				onClick={this.props.onIncrementClick}
			>
				+increment
			</Button>
		</div>
	}

}


Node.propTypes = {

	/**
	 * Total beans count
	 */
	total: PropTypes.number.isRequired,

	/**
	 * Increment button handler
	 */
	onIncrementClick: PropTypes.func

};


export default Node;