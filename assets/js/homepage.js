var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);
  //get value from input element
  var username = nameInputE1.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputE1.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };

 userFormE1.addEventListener("submit", formSubmitHandler);
