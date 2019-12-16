let axios = require('axios')
class Service {
    Post(url,data) {
        return axios.post(url, data);
    }
    Get(url) {
        return axios.get(url);
            //.catch((error) => {
            //    if (error.response)
            //    {
            //        console.log(error.response.data);
            //        console.log(error.response.status);
            //        console.log(error.response.headers);
            //    }
            //    else if (error.request)
            //    {
            //        console.log(error.request);
            //    }
            //    else
            //    {
            //        console.log('Error', error.message);
            //    }
            //    console.log(error.config);
            //});
     
    }

}
module.exports = new Service;