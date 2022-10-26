// step 1: grab the input
// When click the go button, event starts

let button = document.querySelector('.js-go')
button.addEventListener('click', function() {
    var input = document.querySelector("input").value;
    getInput(input);
})

// When press Enter, event listener works

let inputField = document.querySelector('.js-userinput');
inputField.addEventListener('keypress', function(e) {
  
    var input = document.querySelector("input").value;

    // if the key ENTER is pressed
    if(e.key === 'Enter') {
        getInput(input);
    }
});

// step 2: get the data from the API

function getInput(userinput) {
    var search = userinput.split(' ').join('+')
    var url = "https://api.giphy.com/v1/gifs/search?q="+ search + "&api_key=SDEsWMHoj4DO7LFMxWFHlVJVkElcDm8h";


// AJAX Request
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

// When the data loads...
GiphyAJAXCall.addEventListener('load', function(e) {
    
    var data = e.target.response;
    //console.log(data);
    pushToDOM(data);
});

};




// step 3: Show the GIFs 
function pushToDOM(input) {

    var response = JSON.parse(input);
    var imageUrls = response.data;
    var container = document.querySelector('.js-container');

    clear(container);

    imageUrls.forEach(element => {
        var src = element.images.fixed_height.url;
        
        // Add on the url with '+='
        // concatenate the imageurl to the src
        container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
    });

    // Clear the page before new search
    function clear(result) {
        result.innerHTML = "";
    }
}