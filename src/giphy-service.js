// business Logic file

// class for searching giphy based on user's input
export class SearchGiphyService {

    static getGif(userFeeling) {
        return new Promise(function (gifResolved, gifRejected) {
            // making an API request
            let giphySearchRequest = new XMLHttpRequest();

            // getting giphy's search endpoint url and passing user's value in it

            const giphySearchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userGif}&limit=1&offset=0&rating=g&lang=en`
            

            giphyRequest.onload = function () {
                if (this.status === 200) {
                    // we used promiseResolved or promiseRejected to determine whether a promise should be resolved or rejected
                    promiseResolved(giphyRequest.response);
                }
                else {
                    promiseRejected(giphyRequest.response)
                }

            }

            // opening and sending a request to the gif server

            giphyRequest.open("GET", giphySearchUrl, true);
            giphyRequest.send();
        
        });


    }

}