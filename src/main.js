// UserInterface Logic file

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// importing all three classes to my UI logic
import { SearchGiphyService } from "./giphy-service.js";
import { RandomGif } from "./giphy-service.js";
import { TrendingGif } from "./giphy-service.js";



// working with the imported classes

$(document).ready(function () {
    $(".user-form").submit(function (event) {
        // preventing the submit button from refreshing 
        event.preventDefault();

        // taking in the user-emotion value

        const userGif = $("#user-emotion").val();
        // clearing out the form fields after user submits

        $("#user-emotion").val("");

        console.log(userGif);

        // after importing the SearchGiphyService class, we make our API call by doing this:
        let searchPromise = SearchGiphyService.getSearchedGif(userGif);

        searchPromise.then(function (searchedResponse) {
            // parsing the json, so I can be able to access it
            const giphyBody = JSON.parse(searchedResponse);

            // console.log(searchedResponse);

            // showing what I have in my parsed JSON in the console
            // console.log(giphyBody.data[0].embed_url);

            // parsing the json to store the embed_url image in it
            const firstEmbeddedGifUrl = giphyBody.data[0].embed_url;

            // showing(in this case prepending) the gifs in the application for user
            $(".giphy-shower").prepend(
                `
                <br> <br>
                    <h5>You entered; ${userGif}, here is a gif for you</h5> 
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
    });


    $("#other-features").click(function () {

        let userPick = $("#new-features").find(":selected").val();
        console.log(userPick);

        if (userPick === "random") {

            // now we make our API call like this
            let randomPromise = RandomGif.getRandomGif();

            randomPromise.then(function (randomPromiseSuccess) {
                // parsing the json, so I can be able to access it
                const giphyRandomBody = JSON.parse(randomPromiseSuccess);

                // console.log(randomPromiseSuccess);

                // showing what I have in my parsed JSON in the console
                // console.log(giphyBody.data.embed_url);

                // parsing the json to store the embed_url image in it
                const secondEmbeddedGifUrl = giphyRandomBody.data.embed_url;

                // showing(in this case prepending) the gifs in the application for user
                $(".gif-shower-two").prepend(
                    `
                <br> <br>
                <h5>A Random gif for user</h5> 
                <iframe src="${secondEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );
            },
                function (myRandomPromiseFailed) {
                    $(".gif-shower-two").prepend(
                        `
            <br> <br>
            <h5>There was an error processing your Request: ${myRandomPromiseFailed}</h5>    
            <h5>Please Try again</h5>    
            `
                    );
                }
            )

        }
        else if (userPick === "trend") {

            // now we make our API call like this
            let trendingPromise = TrendingGif.getTrendingGif();

            trendingPromise.then(function (trendPromiseSuccess) {
                // parsing the json gotten
                const giphyTrendBody = JSON.parse(trendPromiseSuccess);

                const thirdEmbeddedGifUrl = giphyTrendBody.data[0].embed_url;

                // showing(in this case prepending) the gifs in the application for user
                $(".gif-shower-two").prepend(
                    `
                <br> <br>
                <h5>A Trending gif for user</h5> 
                <iframe src="${thirdEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );

            },
                function (myTrendPromiseFailed) {
                    $(".gif-shower-two").prepend(
                        `
                <br> <br>
                <h5>There was an error processing your Request: ${myTrendPromiseFailed}</h5>    
                <h5>Please Try again</h5>    
                `
                    );
                }
            );

        }

    });


});




// in doing it this way(below) there is no separation of logic but the one I did above is well separated into different logics and different files

/*
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

            // parsing the json, so I can be able to access it
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
                    <h5>You entered; ${userGif}, here is a gif for you</h5> 
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






    });

   // Other features by the great giphy App

    $("#other-features").click(function () {

        let userPick = $("#new-features").find(":selected").val();
        console.log(userPick);

        // clearing out the 

        // running a branch to determine which value user selected to determine which API CALL TO MAKE

        if (userPick === "random") {

            // userPick = "random"

            let giphyRandomPromise = new Promise(function (randomPromiseResolved, randomPromiseRejected) {

                // initiating an XMLhttprequest object for api and storing it in a variable

                let giphyRandomRequest = new XMLHttpRequest();
                // this endpoint is for searching giphy for an mood user might be in 

                // with this enpoint I first protected my API key by hiding it with my environmental variables file and then I inputted the emotion user might be feeling, 
                // At the beginning I set the search by telling giphy I want this particular endpoint to serach for gifs matching user's value 


                const giphyRandomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`

                // using an .onload property here instead of the .onreadystatechange is really great as we no longer have to specify a readyState of 4, 
                // and also it will be triggered once: (when the response has loaded) and not everytime the readyState has changes

                // to summarize: using an onload propery here means we are only waiting for the request to load only
                giphyRandomRequest.onload = function () {

                    // running a branch to give me whas in the response property whether the Status = 200 or not

                    if (this.status === 200) {
                        // we used promiseResolved or promiseRejected to determine whether a promise should be resolved or rejected
                        randomPromiseResolved(giphyRandomRequest.response);
                    }
                    else {
                        randomPromiseRejected(giphyRandomRequest.response)
                    }

                }

                // opening and sending a request to the gif server

                giphyRandomRequest.open("GET", giphyRandomUrl, true)
                giphyRandomRequest.send();
            });

            giphyRandomPromise.then(function (randomPromiseSuccess) {

                // parsing the json, so I can be able to access it
                const giphyRandomBody = JSON.parse(randomPromiseSuccess);

                // console.log(randomPromiseSuccess);

                // showing what I have in my parsed JSON in the console
                // console.log(giphyBody.data.embed_url);

                // parsing the json to store the embed_url image in it
                const secondEmbeddedGifUrl = giphyRandomBody.data.embed_url;

                // showing(in this case prepending) the gifs in the application for user
                $(".gif-shower-two").prepend(
                    `
                <br> <br>
                <h5>A Random gif for user</h5> 
                <iframe src="${secondEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );
            },
                function (myRandomPromiseFailed) {
                    $(".gif-shower-two").prepend(
                        `
                <br> <br>
                <h5>There was an error processing your Request: ${myRandomPromiseFailed}</h5>    
                <h5>Please Try again</h5>    
                `
                    );
                }
            )

        }
        else if (userPick === "trend") {

            // userPick = "trend"
            let giphyTrendPromise = new Promise(function (trendPromiseResolved, trendPromiseRejected) {

                // reinstantiating an XMLHttp object 
                let giphyTrendRequest = new XMLHttpRequest();

                // taking the url for trending gifs

                const giphyTrendUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&tag=&rating=g`

                // using the onload property to wait for the request to load

                giphyTrendRequest.onload = function () {
                    // running another branch to determine whether the status of the trend promise is = 200
                    if (this.status === 200) {
                        trendPromiseResolved(this.response);
                    }
                    else {
                        trendPromiseRejected(this.response);
                    }
                }


                // time to open and send the request 

                giphyTrendRequest.open("GET", giphyTrendUrl, true);
                giphyTrendRequest.send();
            });

            // a .then() to determine whether the promise is resolved(mandatory to do this) or whether the promise is rejected(optional to do this)

            giphyTrendPromise.then(function (trendPromiseSuccess) {
                // parsing the json gotten
                const giphyTrendBody = JSON.parse(trendPromiseSuccess);

                const thirdEmbeddedGifUrl = giphyTrendBody.data[0].embed_url;

                // showing(in this case prepending) the gifs in the application for user
                $(".gif-shower-two").prepend(
                    `
                <br> <br>
                <h5>A Trending gif for user</h5> 
                <iframe src="${thirdEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );

            },
                function (myTrendPromiseFailed) {
                    $(".gif-shower-two").prepend(
                        `
                <br> <br>
                <h5>There was an error processing your Request: ${myTrendPromiseFailed}</h5>    
                <h5>Please Try again</h5>    
                `
                    );
                }
            );
        }



    });


     
    
});

*/