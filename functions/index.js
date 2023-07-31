/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ maxInstances: 10 });

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const axios = require('axios');


const config = (method, action, data) => ({
    method: `${method}`,
    url: `https://ap-south-1.aws.data.mongodb-api.com/app/data-fstpb/endpoint/data/v1/action/${action}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'juQNoAzrPEHNqtU9trAWTQQANeOJsrhIsAGZM9yGHChixeUJH4GZQmSEMQj3seDT',
    },
    data: {
        "collection": "forms",
        "database": "Production",
        "dataSource": "FormBuilder",
        "data": data
    }
});




// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

exports.saveForm = onRequest((req, res) => {
    let data = req.body, resp;
    axios(config("post", "insertMany", data))
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resp = JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
            resp = error
        });

    res.send(resp)
    // res.send({ message: "Saved the data" })
});


exports.getAllForms = onRequest(async (req, res) => {
    let resp;
    axios({
        method: "get",
        url: `https://ap-south-1.aws.data.mongodb-api.com/app/data-fstpb/endpoint/data/v1/action/find`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'juQNoAzrPEHNqtU9trAWTQQANeOJsrhIsAGZM9yGHChixeUJH4GZQmSEMQj3seDT',
        },
        data: { dataSource: "FormBuilder", database: "Production", collection: "forms", filter: {} }
    })
        .then(function (response) {
            resp = JSON.stringify(response.data);
        })
        .catch(function (error) {
            resp = error;
        });

    // const response = await axios.post(
    //     'https://ap-south-1.aws.data.mongodb-api.com/app/data-fstpb/endpoint/data/v1/action/find',
    //     { "dataSource": "FormBuilder", "database": "Production", "collection": "forms", "filter": {} },
    //     {
    //         headers: {
    //             'Content-Type': 'application/ejson',
    //             'Access-Control-Request-Headers': '*',
    //             'api-key': 'juQNoAzrPEHNqtU9trAWTQQANeOJsrhIsAGZM9yGHChixeUJH4GZQmSEMQj3seDT'
    //         }
    //     }
    // );
    res.send({ resp })
});
