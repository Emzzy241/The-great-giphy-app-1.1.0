// business Logic file


// all the classes we created here just creates an API call wrapped in a promise, there is no need for any query or DOM alteration

// class for searching giphy based on user's input
export class SearchGiphyService {

    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before
    static getSearchedGif(userGif) {
        // using the return keyword for returning our promise so our function is not undefined
        return new Promise(function (gifPromiseResolved, gifPromiseRejected) {
            // reinstantiating an API request
            let giphySearchRequest = new XMLHttpRequest();

            // getting giphy's search endpoint url and passing user's value in it

            const giphySearchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userGif}&limit=1&offset=0&rating=g&lang=en`


            giphySearchRequest.onload = function () {
                if (this.status === 200) {
                    // we used gifPromiseResolved or gifPromiseRejected to determine whether a promise should be resolved or rejected
                    gifPromiseResolved(giphySearchRequest.response);
                }
                else {
                    gifPromiseRejected(giphySearchRequest.response)
                }

            }

            // opening and sending a request to the gif server

            giphySearchRequest.open("GET", giphySearchUrl, true);
            giphySearchRequest.send();

        });


    }

}

// a class for implementing random gifs for users

export class RandomGif {

    // a static method running the random API call
    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before

    static getRandomGif() {
        // using the return keyword for returning our promise so our function is not undefined
        return new Promise(function (randomGifResolved, randomGifRejected) {
            // reinstantiating another API request
            let giphyRandomRequest = new XMLHttpRequest();

            // getting giphy's random endpoint(an endpoint is just like a url used for api calls)
            const giphyRandomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`

            // using an .onload property here instead of the .onreadystatechange is really great as we no longer have to specify a readyState of 4, 
            // and also it will be triggered once: (when the response has loaded) and not everytime the readyState has changes

            // to summarize: using an onload propery here means we are only waiting for the request to load only
            giphyRandomRequest.onload = function () {

                // running a branch to give me whas in the response property whether the Status = 200 or not

                if (this.status === 200) {
                    // we used promiseResolved or promiseRejected to determine whether a promise should be resolved or rejected
                    randomGifResolved(giphyRandomRequest.response);
                }
                else {
                    randomGifRejected(giphyRandomRequest.response)
                }

            }

            // opening and sending a request to the gif server

            giphyRandomRequest.open("GET", giphyRandomUrl, true)
            giphyRandomRequest.send();


        });
    }
}


// a class for implementing trending gifs for users

export class TrendingGif {

    // a static method for running the trending gif API call
    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before

    static getTrendingGif() {
        // using the return keyword for returning our promise so our function is not undefined
        return new Promise(function (trendingGifResolved, trendingGiffRejected) {

            // reinstantiating an API request for trending gifs --- This will ensure the request is empty and not give me a request I have previously used
            let giphyTrendingRequest = new XMLHttpRequest();

            // getting a giphy trend endpoint url for users

            const giphyTrendUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&tag=&rating=g`

            // using the onload property to wait for the request to load

            giphyTrendingRequest.onload = function () {
                // running another branch to determine whether the status of the trend promise is = 200
                if (this.status === 200) {
                    trendingGifResolved(giphyTrendingRequest.response);
                }
                else {
                    trendingGiffRejected(giphyTrendingRequest.response);
                }
            }


            // time to open and send the request 

            giphyTrendingRequest.open("GET", giphyTrendUrl, true);
            giphyTrendingRequest.send();

        });
    }
}