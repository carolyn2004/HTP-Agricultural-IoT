var awsIot = require('aws-iot-device-sdk');
var device = awsIot.device({
    keyPath: './certs/private.pem (2).key',
    certPath: './certs/certificate.pem.crt',
    caPath: './certs/AmazonRootCA1 (1).pem',
    clientId: 'first-try',
    host: 'a213ffc7i4orr1-ats.iot.us-east-1.amazonaws.com'
});
var current = new Date().toLocaleString(); //to store the current date and time
device
  .on('connect', function() {
    console.log('connect');
  device.subscribe('my_topic');
    device.publish('my_topic', JSON.stringify({device_id: 1, time: current, temperature: 23, humidity: 50, pH: 7}));
  });
  
  device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
