var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <h5>Submit a comment</h5>
        <textarea id="comment_text" rows="5" cols="100" placeholder="Enter your comment here..."></textarea>
        <br/>
        <input type="submit" id="submit" value="Submit" />
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
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

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();
loadComments();
