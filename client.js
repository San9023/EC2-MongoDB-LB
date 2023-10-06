var dataOut;

setInterval(sendData, 5000); // Time is in ms

function sendData() {
    const http = require('http');

    generateData(); // Generate valid data

    // Define the information for the first EC2 instance
    var postOptions1 = {
        host: '3.81.234.157', // First EC2 instance's public IP address
        port: '3000', // Port of the first EC2 instance
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
    };

    // Define the information for the second EC2 instance
    var postOptions2 = {
        host: '44.206.239.203', // Second EC2 instance's public or private IP address
        port: '3000', // Port of the second EC2 instance
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
    };

  // Make the HTTP POST request to the first EC2 instance
  const req1 = http.request(postOptions1, res => {
    console.log(`statusCode (Instance 1): ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d)
    })
});

req1.on('error', error => {
    console.error(error)
});

req1.write(dataOut); // Write valid data to the first instance
req1.end();
console.log("Sent data to server (Instance 1): " + dataOut);

// Make the HTTP POST request to the second EC2 instance
const req2 = http.request(postOptions2, res => {
    console.log(`statusCode (Instance 2): ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d)
    })
});

req2.on('error', error => {
    console.error(error)
});

req2.write(dataOut); // Write valid data to the second instance
req2.end();
console.log("Sent data to server (Instance 2): " + dataOut);
}

function generateData() {
const sensordata = {
    id: 0,
    name: "temperaturesensor",
    address: "25 Stainer St, Willagee",
    time: Date.now(),
    temperature: 20
}

const low = 10;
const high = 40;
const reading = Math.floor(Math.random() * (high - low) + low);
sensordata.temperature = reading;

// Convert the sensordata object to a JSON string
dataOut = JSON.stringify(sensordata);
}