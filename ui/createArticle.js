
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

loadArticleForm();