// creating an array of letters
let strArray = 'abcdefghijklmnopqrstuvwxyz1234567890+-*/%';
let lettersArray = Array.from(strArray);



let lettersContent = document.querySelector('.letters');



lettersArray.forEach(letter => {
    // creating span letter
    let letterSpan = document.createElement('span');

    // adding class into each span
    letterSpan.className = 'letterValue';

    // adding letter in text node
    let letterText = document.createTextNode(letter);

    // append text node into span
    letterSpan.appendChild(letterText);

    // append span into letters content
    lettersContent.appendChild(letterSpan);

});

// creating object of categories
const category = {
    color : ['green','blue','red','white','orange','black','yellow','gray','pink','brown'],
    programming : ['javascript','python','php','c++','c','kotlin','css','html','java','dart'],
    food : ['pizza','meat','chicken','rice','sandwitch'],
    numbers : ['1','2','3','4','5','10','100','50','1000','1000000','999'],
    sports : ['football','handball','voleyball','basketball','hocky','tennis'],
    trackField : ['back end','front end','data science','embedded system','flutter','android','ui ux','cyber security','computer science'],
    operations : ['+','-','*','/','%']
}
// getting object keys in array
let categoryProperities = Object.keys(category);

// getting random properity number
let randomProperityNumber = Math.floor(Math.random() * categoryProperities.length);

// getting specific properity
let specificProperity = categoryProperities[randomProperityNumber];

// getting values of each properity
let valuesOfProperity = category[specificProperity];

// getting random index from properity array
let randomIndexValue = Math.floor(Math.random() * valuesOfProperity.length);

// getting random value from properity array
let randomValue = valuesOfProperity[randomIndexValue];

// insert category name into span of category
document.querySelector('.game-info .category span').innerHTML = specificProperity;



// convert word into array of letters
let lettersOfWord = Array.from(randomValue);

// setting len equal lenth of word
let len = lettersOfWord.length;

let lettersGuess = document.querySelector('.letters-guess');

// loopping on each letter
lettersOfWord.forEach(l => {

    // creating empty span
    let emptySpan = document.createElement('span');

    // adding class on each span
    emptySpan.className = 'emptySpan';

    // if span is " " add class space on it
    if(l === ' '){

        // adding class space
        emptySpan.classList.add('space');

        // decreacing len
        --len;
    }

    // appending each span into lettersguess
    lettersGuess.appendChild(emptySpan);

});


// selecting all spans
let spans = document.querySelectorAll('.letters-guess .emptySpan');

// selecting div hangman
let hangman = document.querySelector('.hangman-draw');


// set counter = 0
let counter = 0;

// set score = 0
let score = 0;

// checking if localstorage containning value of score
if(window.localStorage.getItem('sco')){

    // set value of score
    score = window.localStorage.getItem('sco')
}

// add key sco with value score
window.localStorage.setItem('sco' , score);
// add event listener
document.addEventListener('click' , (e) => {


    

    // set status = false
    let status = false;
    



    // if specific area  =  span containing letter
    if(e.target.className == 'letterValue'){
        
        // after checking , adding class disabled to prevent click again
        e.target.classList.add('disabled');

        // storing clicked letter into lettername
        let letterName = e.target.innerHTML.toLowerCase();
        
        // storing array f letter into wordContainningLetterName
        let wordContainningLetterName = Array.from(randomValue);
 
        
        // looping on wordContainningLetterName
        wordContainningLetterName.forEach((l , letterIndex) => {

            // if clicked letter = letter from array
            if(l == letterName){
                
               
                // looping on spans 
                spans.forEach((span , spanIndex) => {

                    // checking if spanindex = letterindex
                    if(spanIndex == letterIndex){

                        // content of span clicked letter
                        span.innerHTML = letterName;

                        // sound success
                        document.getElementById('correct').play();

                        // set status true
                        status = true;

                       // decreacing len minus 1
                        --len;



                   
                    }
                    
                })
            }


        });

        // checking if len == 0 to stop clicking on letters content
        if(len == 0){

                // adding class unclickable
                lettersContent.classList.add('noClicking');

                // increasing score by 10 points
                let res = +window.localStorage.getItem('sco') + 10;

                // update value score in localstorage
                window.localStorage.setItem('sco'  , res);

                // reload page again
                window.location.reload();
                
            }

            
        
        // checking status
        if(status == false){

            // increasing counter
            counter++;

            // sound of wrong
           document.getElementById('wrong').play();


            
            // adding classes
            hangman.classList.add(`wrong-${counter}`);

           
          

            // checking if counter = 9
            if(counter === 9){

                
                // adding class to prevent clicking again
                lettersContent.classList.add('noClicking');

               
                // calling function endGame
                endGame();


                   // reloading window after end trial
                setTimeout(() => {

                  // reload page after 5000 milseconds
                   window.location.reload();

                   }, 5000);
               
            }



        }


    }


})

// function defination
function endGame(){


    // adding sound of end
    document.getElementById('hang').play();

    // selecting div game over
    let gameOver = document.querySelector('.game-over');

    // showing div game over
    gameOver.style.display = 'block';

    // selecting second span
    let gameOverSpan = document.querySelector('.game-over .sSpan');

    // content of second span
    gameOverSpan.innerHTML = `correct word is ${randomValue}`;

    // select score p 
    let scoreResult = document.querySelector('.score');

    // set score p
    scoreResult.innerHTML  += score;

    // clear localstorage after getting score
    window.localStorage.clear();

 
}
