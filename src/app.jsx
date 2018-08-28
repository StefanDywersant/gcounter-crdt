import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Components/Node';
import nodeCode from './Node/node'; // loads raw code, see webpack.config.js
import styles from './app.scss';


/**
 * Total node count
 * @type {number}
 */
const NODES = 3;

/**
 * @typedef {{
 *  element: HTMLElement,
 *  total: number,
 *  worker: WebWorker
 * }} BeanCounterNode
 */

/**
 * Node entities
 * @type {BeanCounterNode[]}
 */
const nodes = new Array(NODES)
	.fill(0)
	.map(() => ({
		element: null,
		total: 0,
		worker: new Worker(window.URL.createObjectURL(new Blob([nodeCode])))
	}));


/**
 * Handles increment key/button click.
 * @param {BeanCounterNode} node Node entity
 */
const onIncrementClick = function(node) {
	node.total++;
	node.worker.postMessage({type: 'increment'});
	render();
};

/**
 * Renders scene to document.
 */
const render = function() {
	ReactDOM.render(
		<ul className={styles.counters}>
			{nodes.map((node, id) => (
				<li key={id}>
					<Node
						ref={el => node.element = el}
						total={node.total}
						onIncrementClick={onIncrementClick.bind(null, node)}
					/>
				</li>
			))}
		</ul>,
		document.getElementById('root')
	);
};

/**
 * Animates communication between two nodes.
 * @param {number} from Source node identifier
 * @param {number} to Target node identifier
 * @param {number} duration Desired communication duration
 */
const animate = function(from, to, duration) {
	if (!nodes[from].element || !nodes[to].element) {
		return;
	}

	const fromPos = nodes[from].element.socketPosition;
	const toPos = nodes[to].element.socketPosition;

	if (!fromPos || !toPos) {
		return;
	}

	const rayEl = document.createElement('div');
	rayEl.className = styles.ray;
	rayEl.style.left = fromPos.x + 'px';
	rayEl.style.top = fromPos.y + 'px';
	rayEl.style.transitionDuration = (duration / 1000) + 's';

	const removeRayEl = () => {
		if (document.body.contains(rayEl)) {
			document.body.removeChild(rayEl);
		}
	};

	rayEl.addEventListener('transitionend', removeRayEl);
	setTimeout(removeRayEl, duration); // firefox doesn't always trigger transitionend

	document.body.appendChild(rayEl);

	setTimeout(() => {
		rayEl.style.left = toPos.x + 'px';
		rayEl.style.top = toPos.y + 'px';
	}, 10);
};


// listen to keyboard events
document.addEventListener('keydown', (event) => {
	const id = event.keyCode - 49;

	if (id >= 0 && id < 10 && id < nodes.length) {
		onIncrementClick(nodes[id]);
	}
});

// initialize workers
nodes.forEach((node, id) => {
	node.worker.onmessage = (e) => {
		const message = e.data;

		switch (message.type) {
			case 'state':
				// route state update to target node
				nodes[message.target].worker.postMessage(message);
				break;

			case 'ui:communication':
				// animate communication between two nodes
				animate(id, message.target, message.duration);
				break;

			case 'ui:total':
				// update local-total value on node
				nodes[id].total = message.total;
				render();
				break;
		}
	};

	// initialize worker
	node.worker.postMessage({
		type: 'init',
		id,
		nodes: NODES
	});
});

// render scene for the first time
render();