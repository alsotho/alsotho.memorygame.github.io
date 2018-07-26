/* I've got codes, I've got coooddesss, in different area codes.
Notes made with the help of 2k Ratchet Spotify Playlist: https://open.spotify.com/user/tracyyallison/playlist/4HUpeCrKrJowHKCsf6amDB?si=6vqUqJQIRfeFImE98W2pJA */

// List of cards
var allGameCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];
var gameCards = allGameCards.concat(allGameCards);


// to the right, to right, to the left, to the left. Let me see your Cupid Shuffle. Function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

    return array;
}

// Variable for shuffling cards right around, right around
const shuffleCards = shuffle(gameCards);

// back it up then stop, wha-what drop it like it's hot.
// loops and replaces with new cards
const cardsI = document.querySelectorAll(".card i");
    function looping(){
        for(let i = 0; i < gameCards.length; i++){
            cardsI[i].setAttribute('class', shuffleCards[i]);
    }
}

// cycloning all loop functions all night long
looping();


// variables to target all cards, all over the world
const deckLi = document.querySelectorAll('.deck li');

let cardOne = '';
let cardOneParent = '';
let cardTwo = '';
let cardTwoParent = '';

let openedCardsNum = 0;
let countLifes = 0;

var restartGame = document.querySelector(".restart");

let matchedCards = 0;
let newStarsLiClass = '';

function listener(){
    for(let i = 0; i < gameCards.length; i++){

        //show all cards for 2 seconds
        deckLi[i].setAttribute('class', 'card open show');
            setTimeout(() => {
                deckLi[i].setAttribute('class', 'card');
            }, 2000);

        deckLi[i].addEventListener('click', function(evt){
            let targetClass = evt.target.className;
            if(targetClass == "card" && openedCardsNum != 2){

            deckLi[i].className = ('class', 'card open show');

                // count and set the moves
                countMoves += 1;
                moves.innerHTML = countMoves;

                // life counter
                countLifes += 1;

                //variable for matching cards
                if(cardOne == false ){
                    cardOne = evt.target.firstElementChild.className;
                    cardOneParent = evt.target;
                    openedCardsNum += 1;
                }else{
                    cardTwo = evt.target.firstElementChild.className;
                    cardTwoParent = evt.target;
                    openedCardsNum += 1;
                }

                //function for opened cards
                function cardClasses(){
                    // count of matched cards
                    if(openedCardsNum === 2){
                        if(cardTwo == cardOne){
                            matchedCards += 2;
                        }
                    }
                    setTimeout(() => {
                        if(openedCardsNum === 2){
                            if(cardTwo == cardOne){
                                // add open match to the parents of both elements
                                cardOneParent.className = 'card open match';
                                cardTwoParent.className = 'card open match';

                                // return opened cards to 0, removes parent/children variable
                                openedCardsNum *= 0;
                                cardOne = '';
                                cardTwo = '';
                                cardOneParent = '';
                                cardTwoParent = '';

                            }else{
                                // remove open match to the parents of both elements
                                cardOneParent.className = 'card';
                                cardTwoParent.className = 'card';

                                // return opened cards to 0, removes parent/children variable
                                openedCardsNum *= 0;
                                cardOne = '';
                                cardTwo = '';
                                cardOneParent = '';
                                cardTwoParent = '';
                            }
                        };
                    }, 1000);
                }
                cardClasses();
            }
        });


        // star and timer function
        deckLi[i].onclick = (function(){
            displayStar();

            // set timer
            const getTime = document.querySelector('.timer');
            if(countMoves == 1){
                if(getTime.innerText == "00:00"){
                    startTimer();
                    timer();
                }
            }

            win();
        });
    };
}

// call for function listener on the hotline
listener();


// Stop, and wiggle with it yea
//Timer function
const timeDiv = document.createElement('div');
timeDiv.setAttribute('class', 'timer');
restartGame.insertAdjacentElement('beforebegin', timeDiv);
timeDiv.innerText = "00:00";

var status = 0;
var time = 0;

function startTimer() {
    status = 1;
}
function resetTimer(){
    status = 0;
    time = 0;
}
function stopTimer(){
    status = 0;
}
function timer(){
    if( status == 1){
        setTimeout(() => {
            time++;
            let min = Math.floor(time/100/60);
            let sec = Math.floor(time/100);

            if(min < 10){
                min = "0" + min;
            }

            if(sec >= 60){
                sec = sec % 60;
            }

            if(sec < 10){
                sec = "0" + sec;
            }

            timeDiv.innerHTML = min + ":" + sec;
            timer();
        }, 10);
    }
}

// count and set the moves
let countMoves = 0;
const moves = document.querySelector('.moves');
moves.innerHTML = countMoves;

// give me all the stars thru the phone
// call for all stars
stars();

function displayStar(){
    if(cardTwo != cardOne){
        if(countLifes == 8){
            newStarsLiClass[0].className ='fa';
        }else if(countLifes == 16){
            newStarsLiClass[1].className ='fa';
        }
    }else if(cardTwo == cardOne){
        countLifes *=0;
    }
}

let getFaStar = document.getElementsByClassName('fa fa-star');
let starsString = '';
function faStarCount(){
	if(getFaStar.length == 1){
		return starsString = " Star";
	}else{
		return starsString = " Stars";
	}
}
faStarCount();

// resets stars
function stars(){
    const starsLiClass = document.getElementsByClassName('fa-star');
    newStarsLiClass = Array.prototype.slice.call(starsLiClass);

        for (let i = 0; i < 3; i++) {
            newStarsLiClass[i].className = 'fa fa-star';
        }
}

// we fly high, no lie, you know this (codin)
// winning message, stats, play again
let container = document.querySelector('.container');
const winDiv = document.createElement('div');
winDiv.setAttribute('class', 'win');


function win(){
    if(matchedCards == 16){
        const htmlDone = document.createElement('div');
        const htmlDoneH1 = document.createElement('h1');
        const htmlDoneH2 = document.createElement('h2');
        const htmlDoneP = document.createElement('p');


        htmlDone.setAttribute('class', 'done');
        const doneInner = document.createElement('div');
        doneInner.setAttribute('class', 'done-inner');
        htmlDone.appendChild(doneInner);


        container.insertAdjacentElement('afterbegin', htmlDone);
        doneInner.appendChild(htmlDoneH1);
        doneInner.appendChild(htmlDoneH2);
        doneInner.appendChild(htmlDoneP);


        htmlDoneH1.innerText = 'Woot! XD';
        htmlDoneH2.innerText = 'Your Stats:';

        var min = Math.floor(time/100/60);
        var sec = (Math.floor(time/100)) % 60;
        htmlDoneP.innerText = countMoves + ' moves with ' + getFaStar.length + faStarCount() + '\nCompleted in ' + min + ' Minutes and ' + sec + ' Seconds';

        var hypreReload = document.createElement('a');
        var linkText = document.createTextNode("Try again");
        hypreReload.appendChild(linkText);
        hypreReload.title = "Try again";
        hypreReload.href = "index.html";
        doneInner.appendChild(hypreReload);

        // resets game
        matchedCards = 0;
        stopTimer();
        restart();
    }
}

// restarts game
function restart(){
    restartGame.onclick = (function(){

        // reset timer
        resetTimer();

        // reset matched cards
        for(let i = 0; i < gameCards.length; i++){
            deckLi[i].setAttribute('class', 'card');
        }

        // return the counter to 0
        openedCardsNum *= 0;
        // remove all parent/children variable
        cardOne = '';
        cardTwo = '';
        cardOneParent = '';
        cardTwoParent = '';
        // reset moves
        moves.innerHTML = 0;

        //reset stars
        countMoves = 0;
        newStarsLiClass[0].setAttribute('class', 'fa fa-star');
        newStarsLiClass[1].setAttribute('class', 'fa fa-star');
        newStarsLiClass[2].setAttribute('class', 'fa fa-star');

        // more cupid shuffles
        listener();
        shuffle(gameCards);
        looping();
    });
}
// restart
restart();
