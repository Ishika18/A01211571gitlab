/* app saves the history of watched movies as a table and use local storage to keep the items stored even after refreshing the page.
Though, nothing will be deleted in the history section, if user deletes a movie and refreshes page the deleted movie will not show up
in the list of movies */



// https://jsfiddle.net/cferdinandi/cm0qLyzu/
// idea source - https://gomakethings.com/updating-your-ui-based-on-user-inputs-with-vanilla-javascript/
// https://www.w3schools.com/howto/howto_js_todolist.asp

// making a global var
// changes for github lab (removed extra spaces and added this comment)
var saved = "";
var array = [];

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";

    // change values in local storage
    window.localStorage.clear();
    window.localStorage.setItem('MovieListItems', JSON.stringify(document.getElementById("myUL").innerHTML));
  }
}

// Making a table to save history

// Find a <table> element with id="myTable":
var table = document.createElement("TABLE");
table.setAttribute("id", "myTable");
document.getElementById("table").appendChild(table);


// Create an empty <thead> element and add it to the table:
var header1 = document.createElement("th");
header1.setAttribute("id", "movieName");
header1.innerHTML = "<b>Movie Name</b><br>";
document.getElementById("myTable").appendChild(header1);

var header2 = document.createElement("th");
header2.setAttribute("id", "watchCount");
header2.innerHTML = "<b>Watch Count</b>";
document.getElementById("myTable").appendChild(header2);

// Add border to the table and header
document.getElementById("myTable").style.border = "thick solid black";
document.getElementById("movieName").style.border = "1 px solid black";
document.getElementById("watchCount").style.border = "1 px solid black";

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        // change values in local storage
        window.localStorage.clear();
        window.localStorage.setItem('MovieListItems', JSON.stringify(document.getElementById("myUL").innerHTML));
      }
    }
  

    if ( array.includes(inputValue) ) {
        document.getElementById(inputValue).innerHTML = f(array, inputValue);
    } else {
      var tr = document.createElement("tr");
      // tr.setAttribute("id", inputValue);
      var s1 = document.createTextNode(inputValue);
      tr.appendChild(s1);
      // Add the movie to table
      document.getElementById("movieName").appendChild(tr);
  
      var td = document.createElement("td");
      td.setAttribute("id", inputValue);
      var s2 = document.createTextNode(f(array, inputValue));
      td.appendChild(s2);
      tr.appendChild(td);
    }
  }

  array.push(inputValue);
  window.localStorage.setItem('MovieArray', JSON.stringify(array));
  console.log(window.localStorage.getItem('MovieArray'));


  window.localStorage.setItem('MovieListItems', JSON.stringify(document.getElementById("myUL").innerHTML));
  window.localStorage.setItem('MovieNames', JSON.stringify(array));
  console.log(window.localStorage.getItem('MovieNames'));

  // Clear the input text
  document.getElementById("myInput").value = "";

}

// function to count the number of times a value repeats in an array
function f(array, inputValue){
  var n = 1;
  for(i = 0; i < array.length; i++){
      if(array[i] == inputValue){n++}
  }
  return n;
}

// clear movies
function myFunction2() {
  document.getElementById("myUL").innerHTML = '';
  // change values in local storage
  window.localStorage.clear();
  window.localStorage.setItem('MovieListItems', JSON.stringify(document.getElementById("myUL").innerHTML));
}

// If there are any saved items, update our list
if (window.localStorage.getItem('MovieListItems')) {
    var items = window.localStorage.getItem('MovieListItems');
    document.getElementById("myUL").innerHTML = JSON.parse(items);
    console.log(document.getElementById("myUL").innerHTML);
} 

if (window.localStorage.getItem('MovieNames')) {
    var temp_array = JSON.parse(window.localStorage.getItem('MovieNames'));
    var array = [];

    temp_array.forEach(element => {
      console.log(element);
      if ( array.includes(element) ) {
        document.getElementById(element).innerHTML = f(array, element);
      } else {
        var tr = document.createElement("tr");
        // tr.setAttribute("id", inputValue);
        var s1 = document.createTextNode(element);
        tr.appendChild(s1);
        // Add the movie to table
        document.getElementById("movieName").appendChild(tr);
    
        var td = document.createElement("td");
        td.setAttribute("id", element);
        var s2 = document.createTextNode(f(array, element));
        td.appendChild(s2);
        tr.appendChild(td);
    }
  
    array.push(element);
    });
}
else {
  console.log("It never executes");
}
