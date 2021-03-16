function PeerObject(groupId, userID) {
	
	userID = (userID) ? userID : "User" + Math.floor(Math.random() * 10000);
	groupId = (groupId) ? groupId : "ObjectId" + Math.floor(Math.random() * 10000);

	console.log("GroupId: " + groupId);

	const MsgType = Object.freeze({
		DATA_UPDATE: 1,
		PEER_JOINED: 2,
		PEER_UPDATE: 3,
		PRIVATE_MSG: 4,
	});

	let store = {
		"version": 0,
		"data": {}
	};

	function updateStoreFromExternal(message) {
		if (message.type == MsgType.DATA_UPDATE) {
			// External updates
			if (store["version"] != message.store["version"]) {
				Object.assign(store["data"], message["store"]["data"]);
				store["version"] = message["store"]["version"]
			}
		}
	}

	function updateAndSyncStoreChangeDet(update, group) {
		// Improve logic
		console.log(store.data, "  -  ", update);
		store["version"]++;

		group.send(JSON.stringify({
			type: MsgType.DATA_UPDATE,
			store: store
		}));
	}

	function joinObject(updates = () => {}, error = () => {}) {

		let group = connectToGroup(groupId, (message) => {

			if (message.type == MsgType.DATA_UPDATE) {
				// External updates
				updateStoreFromExternal(message);
			}
			updates(message.store.data);

		}, (err) => {
			console.error(err);
			if (error) error(err);
		})
		store["data"] = Introspected.observe({},
			(data) => {
				// Internal updates
				updateAndSyncStoreChangeDet(data, group);
			}
		);

		return {
			"store": store["data"],
			group,
			groupId,
			userID
		};
	}


	function createObject(updates = () => {}, error = () => {}) {

		let group = connectToGroup(groupId, (message) => {
			if (message.type == MsgType.DATA_UPDATE) {
				updateStoreFromExternal(message);
			}
			updates(message.store.data);
		}, (err) => {
			console.error(err);
		})

		store["data"] = Introspected.observe({},
			(data) => {
				// Internal updates
				updateAndSyncStoreChangeDet(data, group);
			}
		);

		return {
			"store": store["data"],
			group,
			groupId,
			userID
		};
	}


	function connectToGroup(groupId, updates, err) {
		let group = new PeerGroup(err, {
			host: 'localhost',
			port: 9000,
			path: '/myapp'
		});

		group.addEventListener('message', function (event) {
			let mesageObject = JSON.parse(event.message);
			updates(mesageObject);
		});

		group.addEventListener('joined', function (event) {
			console.log('Greetings from ' + userID);
		});

		group.connect(groupId, userID);

		return group;
	}

	return {
		joinObject,
		createObject
	}
}