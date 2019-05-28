module.exports = {
    *onError (reqDetail, err) {
        return {
            response : {
                statusCode : 500,
                header: { 'content-type': 'text/html' },
                body : 'Error during processing your request.'
            }
        }
    }
}