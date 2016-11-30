var read=`<p>
       Sources said during the meeting chaired by the Congress president Sonia Gandhi, top party leaders were of the view that
                            implementation of demonetisation move along with its alleged leakage to BJP should be questioned
                            in both houses of Parliament.
                             </p>
                        `;
//document.querySelector('button').addEventListener('click', function() {
var btn = document.getElementById('btn');
if (btn) {
btn.addEventListener('click', function() {
    document.getElementById('content').innerHTML = read;
});
}

function loadLoginForm () {
   var loginHtml = ` 
            <h2> Log In / Sign Up</h2>
            <label for="username">Username:</label>
             
            <input type="text" id="username" name="username" placeholder="Your Username">
             
            <label for="password">Password:</label>
             
            <input type="password" id="password" name="password" placeholder="Your Password">
             
            <input type="submit" id="login_btn" value="Login" />
            <input type="submit" id="register_btn" value="Register"/> `;
            
     document.getElementById('login_area').innerHTML = loginHtml;    
        
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Success!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <a href="/logout">Logout</a>
        <h3> Welcome <b>${username}</b></h3><br>
        Create your own article.. <a href="/ui/article.html>Click here</a>
        
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}

function loadArticleForm() {
	//added form tag and required attributes
    var articleHtml = `
        <h2>Your Article</h2>
	<form id="article_form">
        <input type="text" id="heading" placeholder="Heading" required/><br/>
        <input type="text" id="title" placeholder="Title" required/><br/>
        <input type="text" rows="4" cols="50" id="content" placeholder="Content"/><br/>
        <input type="submit" id="save_btn" value="Create" />
 	</form>
        `;
        document.getElementById('article_area').innerHTML = articleHtml;
        var store = document.getElementById('save_btn');
	//handling onsubmit event of form
 	var article_form=document.getElementById('article_form');
         article_form.onsubmit = function (e) {
 	e.preventDefault();//prevent default form submission
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  alert('Article created successfully');
		  //location.reload(true);
		  //reset the form
		  article_form.reset();
		  //now, load the articles dynamically
		  loadArticles();
              }
              else if(request.status === 403){ //for alerting users to register/login to create article
                alert('You must Register/Login to create new Article');
	      } 
              else {
		  //use this alert message
                  alert('Article could not be created or Article already exist!');
              }
		  //use this once here
		  store.value = 'Create';
          }
        };
	var heading = document.getElementById('heading').value;
	var title = document.getElementById('title').value;
	var content = document.getElementById('content').value;
        request.open('POST', '/create-article', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({heading:heading, title:title , content:content}));  
        store.value = 'Creating...';
    };
}

// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();

loadArticleForm();
