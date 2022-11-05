import axios from 'axios';

class HttpRequest {

    #reqMethod = 'GET';
    #reqUrl = '';

    setMethod(reqMethod) {
        this.reqMethod = reqMethod;
    }

    setUrl(reqUrl) {
        this.reqUrl = reqUrl;
    }

    async callUrl() {
        const option = {
            method: this.reqMethod,
            url: this.reqUrl,
            responseEncoding: 'binary',
        }

        // Since we are unaware of the error response body I am assuming status as 400
        return axios
            .request(option)
            .then(({status, data, headers}) => ({
                status, data, headers
            }))
            .catch((err) => ({
                status: 400, message: err || "Something went wrong with the request url"
            }))
    }
}

export default new HttpRequest();
