//@ts-check

"use strict";

import * as net from "net";

(function main() {
	const portNum = parseInt(process.argv[2]);
	if (Number.isNaN(portNum) || portNum === undefined) {
		console.log("No Command Line Argument for Port Number!!!");
		return false;
	}
	const address = process.argv[3];
	if (address === undefined) {
		console.log("No Command Line Argument for Address!!!");
		return false;
	}
	const client = net.createConnection({ port: portNum, host: address });
	client.on("data", receiveServerMessage);
	client.on("error", handleError);
	client.on("end", endCommunication);

	function receiveServerMessage(message) {
		const messageToString = message.toString();
		const messageByteLength = messageToString.length;

		console.log(
			`Received: ${messageToString}(${messageByteLength} bytes).`,
		);
		client.end();
	}

	function endCommunication() {
		console.log("GoodBye!");
	}

	function handleError(err) {
		console.log(`Connection could not be made, error code: ${err}`);
	}
})();
