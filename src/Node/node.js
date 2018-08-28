/**
 * Minimum time which must pass before sending state update to other node
 * @type {number}
 */
const DELAY_MIN = 1000;

/**
 * Maximum time which may pass before sending state update to other node
 * @type {number}
 */
const DELAY_MAX = 5000;

/**
 * Self node identifier
 * @type {number|null}
 */
let myId = null;

/**
 * Node's internal state
 * @type {number[]|null}
 */
let myState = null;


/**
 * Initializes node
 * @param {number} id Node identifier
 * @param {number} nodes All node count
 */
const init = function(id, nodes) {
	myId = id;
	myState = new Array(nodes).fill(0);
};

/**
 * Increments local counter and broadcasts the update to other nodes.
 */
const increment = function() {
	if (!myState) {
		throw new Error('Worker not initialized');
	}

	myState[myId]++;

	// broadcast state copy to other nodes
	broadcast(myState.concat());
};

/**
 * Merges foreign state into local state.
 * @param {number[]} state Foreign state
 */
const merge = function(state) {
	if (!myState) {
		throw new Error('Worker not initialized');
	}

	state.forEach((value, i) => myState[i] = Math.max(value, myState[i]));

	// send UI update immediately
	self.postMessage({
		type: 'ui:total',
		total: myState.reduce((total, node) => total + node, 0)
	});
};

/**
 * Broadcasts state update to all other nodes.
 * @param {number[]} state State being broadcasted
 */
const broadcast = function(state) {
	state.forEach((_, id) => {
		// do not send update to self
		if (id === myId) {
			return;
		}

		const delay = Math.floor(DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN));

		setTimeout(() => {
			self.postMessage({
				type: 'state',
				target: id,
				state
			});
		}, delay);

		// send UI update immediately
		self.postMessage({
			type: 'ui:communication',
			target: id,
			duration: delay
		});
	});
};

// handles incoming message
self.onmessage = (event) => {
	const message = event.data;

	switch (message.type) {
		case 'init':
			init(message.id, message.nodes);
			break;

		case 'increment':
			increment();
			break;

		case 'state':
			merge(message.state);
			break;
	}
};