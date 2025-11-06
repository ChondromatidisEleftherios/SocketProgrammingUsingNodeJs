//@ts-check

"use strict";

import * as net from "net";

(function main() {
	const portNum = 13;
	const address = process.argv[2];
	if (address === undefined) {
		console.log("No Command Line Argument for Address!!!");
		return false;
	}
	const client = net.createConnection({
		port: portNum,
		host: address,
	});
	client.on("data", receiveServerMessage);
	client.on("error", handleError);

	function receiveServerMessage(message) {
		const messageToString = message.toString();

		console.log(`Received: ${messageToString}`);
		client.end();
	}

	function handleError(err) {
		console.log(`Connection could not be made, error code: ${err}`);
	}
})();
