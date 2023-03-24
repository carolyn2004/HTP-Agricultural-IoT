var AWS = require('aws-sdk');
var iotdata = new AWS.IotData({ endpoint: "a213ffc7i4orr1-ats.iot.us-east-1.amazonaws.com" });
var lambda = new AWS.Lambda({
    region: 'us-east-1' //change to your region
});
exports.handler = function(event, context, callback) {
    console.log("Device_id:" + event.device_id.toString() + "Temperature:" + event.temperature.toString());
    if (event.temperature < 23) {
        var postData = JSON.stringify({ time: event.time, command: "automated heating system will be switched on" });
        var params = {
            topic: 'my_topic',
            payload: postData,
            qos: 0
        };
        iotdata.publish(params, function(err, data) {
            if (err) {
                console.log("Error occured : ", err);
            }
            else {
                console.log("success.....");
            }
        });

        lambda.invoke({
            FunctionName: 'arn:aws:lambda:us-east-1:294593484020:function:UploadFileIntoS3Bucket',
            Payload: JSON.stringify(event, null, 2) // pass params
        }, function(error, data) {
            if (error) {
                context.done('error', error);
            }
            if (data.Payload) {
                context.succeed(data.Payload)
            }
        })

    }
    callback();
};
