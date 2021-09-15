var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
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
    console.log(user);
  
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      //request was successful
      if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        displayRepos(data, user);
        console.log(data);
      });
    } else {
      alert("Error:GitHub User Not Found");
    }
    })
    .catch(function(error){
      // Notic this '.catch()' getting chained onto the end of the '.then()'
      alert("Unable to connect to GitHub");
    });
  };
  var displayRepos = function(repos,searchTerm){
    // check if api returned any repos
    if (repos.length === 0) {
      repoContainerEl.textContent = "No repositories found.";
      return;
    }

    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
      //format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;

      // create a container for each repo
      var repoE1 = document.createElement("div");
      repoE1.classList = "list-item flex-row justify-space-between align-center";

      // create a span element to hold repository name
      var titleE1 = document.createElement("span");
      titleE1.textContent = repoName;

      //append to container
      repoE1.appendChild(titleE1);

      // create status element
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";

      // check if current repo has issues or not
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML = 
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }

      // append to container
      repoE1.appendChild(statusEl);

      //append container to the dom
      repoContainerE1.appendChild(repoE1);
    }
  };

 userFormE1.addEventListener("submit", formSubmitHandler);
