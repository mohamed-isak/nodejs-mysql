
const variables = {
    domain: 'http://localhost:5000/',
    goodResponse:{
        Status: 200,
        Message: "Success",
    },
    badResponse: {
        Status: 400,
        Message: "something went wrong"
    },
    dataNotmatched: {
        Status: 404,
        Message: "email or password wrong"
    },
    dataExists: {
        Status: 409,
        Message: "Category is already exists"
    },
    noData: {
        Status: 404,
        Message: "No data found",
        Data: []
    }
}

module.exports = variables; 