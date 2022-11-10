import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function () {
    $(".user-form").submit(function (event) {
        // preventing the submit button from refreshing 
        event.preventDefault();

        // taking in the user-emotion value

        const userGif = $("#user-emotion").val();
        // clearing out the form fields after user submits

        $("#user-emotion").val("");

        console.log(userGif);


        // New code starts here
        let giphyPromise = new Promise(function (promiseResolved, promiseRejected) {

            // initiating an XMLhttprequest object for api and storing it in a variable

            let giphyRequest = new XMLHttpRequest();
            // this endpoint is for searching giphy for an mood user might be in 

            // with this enpoint I first protected my API key by hiding it with my environmental variables file and then I inputted the emotion user might be feeling, 
            // At the beginning I set the search by telling giphy I want this particular endpoint to serach for gifs matching user's value 


            const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userGif}&limit=1&offset=0&rating=g&lang=en`

            // using an .onload property here instead of the .onreadystatechange is really great as we no longer have to specify a readyState of 4, 
            // and also it will be triggered once: (when the response has loaded) and not everytime the readyState has changes

            // to summarize: using an onload propery here means we are only waiting for the request to load only
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

            giphyRequest.open("GET", giphyUrl, true)
            giphyRequest.send();
        });

        giphyPromise.then(function (myPromiseSuccess) {

            // parsin the json, so I can be able to access it
            const giphyBody = JSON.parse(myPromiseSuccess);

            // console.log(myPromiseSuccess);

            // showing what I have in my parsed JSON in the console
            // console.log(giphyBody.data[0].embed_url);

            // parsing the json to store the embed_url image in it
            const firstEmbeddedGifUrl = giphyBody.data[0].embed_url;

            // showing(in this case prepending) the gifs in the application for user
            $(".giphy-shower").prepend(
                `
                <br> <br>
                    <h5>You are ${userGif}, this is a gif for you</h5> 
                <iframe src="${firstEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
            );

        },
            function (myPromiseFailed) {
                $(".giphy-shower").prepend(
                    `
                <br> <br>
                <h5>There was an error processing your Request: ${myPromiseFailed}</h5>    
                <h5>Please Try again</h5>    
                `
                );
            }

        )


        /*
        //  Storing a function The property(or key) of XMLHttprequest that will listen for changes to the XMLHttpRequest

        giphyRequest.onreadystatechange = function () {
            // I want to console.log it so I can see whether the 4 states I expect XMLHttpRequest to go through before it gives me a response

            console.log(this.readyState);

            // running a branch to tell JavaScript to do something only when the fourth(and final) state of XMLHttprequest has been attained

            if (this.readyState === 4 && this.status === 200) {
                // note responseText will be the parsed JSON which should be in string format
                const giphyResponse = JSON.parse(this.responseText);

                getGifs(giphyResponse);
            }
            // to be precise now: this conditional states that the API call must be successful and the data transfer must be complete before our code processes that data.
        };

        // the 3 parameters here are: 1--- get me information("GET"), 2-- take in my endpoint I already stored in avariable, and three is a boolean which is: Yes I want you to open my request for me
        giphyRequest.open("GET", giphyUrl, true);

        // finally after I've done all the above, send the request to the server
        giphyRequest.send();

        function getGifs(myGifResponse) {

            // to get my gif's url, I would pick the  img tag I have in index.html and then 
            // give it a url value of my user's emotion
            console.log(myGifResponse.data[0].embed_url);

            // $("img").attr("src", myGifResponse.data[0].url);

            const firstEmbeddedGifUrl = myGifResponse.data[0].embed_url;

            // firstImage.src = myGifResponse.data[0].embed_url;
            // console.log(firstImage);

            $(".giphy-shower").prepend(
                `
                <br> <br>
                    <h5>You are ${userGif}, this is a gif for you</h5> 
                <iframe src="${firstEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
            );

        }



        */

      
    });


/*
    // Other features by the great giphy App

    // saving up the 2 new features the app offers

    $("#other-features").click(function () {

        let userPick = $("#new-features").find(":selected").val();
        console.log(userPick);

        // clearing out the 

        // running a branch to determine which value user selected to determine which API CALL TO MAKE


        if (userPick === "random") {

            // doing the same thing I did for the first app feature by the left 
            // the only difference is the difference in the API call I'm making

            let giphyRandomRequest = new XMLHttpRequest();

            // using another endpoint(the random endpoint): not the endpoint above but a different one 
            // that will allow me ask giphy for a random gif

            const randomGiphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`

            giphyRandomRequest.onreadystatechange = function () {
                console.log(this.readyState);

                if (this.readyState === 4 && this.status === 200) {
                    const giphyRandomResponse = JSON.parse(this.responseText);

                    getRandomGifs(giphyRandomResponse);
                }



            };
            // time to open and send my random requests
            giphyRandomRequest.open("GET", randomGiphyUrl, true);
            giphyRandomRequest.send();


            // function for getting the random gifs and showing them to user

            function getRandomGifs(myGiphyRandomResponse) {
                $(".ranGif").show();
                $(".treGIf").show();
                console.log(myGiphyRandomResponse.data.embed_url);

                const secondEmbeddedGiphyUrl = myGiphyRandomResponse.data.embed_url;

                console.log(secondEmbeddedGiphyUrl);


                $(".gif-random-shower").prepend(
                    `
                    <br> <br>
                    <h5>A random gif</h5> 
                    <iframe src="${secondEmbeddedGiphyUrl}" height="300" width="290" frameborder="0" allowfullscreen>
                    
                    </iframe>`
                );

            }



        }
        else if (userPick === "trend") {

            let giphyTrendRequest = new XMLHttpRequest();

            // storing new endpoint in a variable: using the giphy trend endpoint 

            const giphyTrendUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&tag=&rating=g`



            // NOTE: the 2 new features added don't need 2 parameters like the first one that needed(uservalue and API key)
            // the only thing the 2 new features need is just the api key, the Team @giphy have already taken care of both the random and trend requests we used

            giphyTrendRequest.onreadystatechange = function () {
                console.log(this.readyState);

                // a branch to determine if the trend request has been gotten with the giphy API

                if (this.readyState === 4 && this.status === 200) {
                    const giphyTrendResponse = JSON.parse(this.responseText);

                    getTrendGifs(giphyTrendResponse);
                }

            };

            // opening and sending the trend request

            giphyTrendRequest.open("GET", giphyTrendUrl, true);
            giphyTrendRequest.send();


            // function for getting the random gifs and showing them to user

            function getTrendGifs(myGiphyTrendResponse) {
                console.log(myGiphyTrendResponse.data[0].embed_url);

                const thirdEmbeddedGifUrl = myGiphyTrendResponse.data[0].embed_url;

                $(".gif-trend-shower").prepend(
                    `
                    <br> <br>
                    <h5>A Trending gif</h5> 
                    <iframe src="${thirdEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );
            }

        }

    })
        */
});