//@ts-check

"use strict";

import * as net from "net";

(function main() {
	const portNum = 2025;
	const loopbackAddress = "127.0.0.1";
	const client = net.createConnection({ port: portNum, host: loopbackAddress });
	client.on("data", receiveServerMessage);
	client.on("error", handleError);
	client.on("end", endCommunication);

	function receiveServerMessage(message) {
		const messageToString = message.toString();
		const messageByteLength = messageToString.length;

		console.log(`Received: ${messageToString}(${messageByteLength} bytes).`);
		client.end();
	}

	function endCommunication() {
		console.log("GoodBye!");
	}

	function handleError(err) {
		console.log(`Connection could not be made, error code: ${err}`);
	}


}());