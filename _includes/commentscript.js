

        const page = "{{ page.id }}"

        // Reading comments script

        // let can declare a variable limited to the scope of a block statement or an expression where it is used, unlike var where it can declare globally
    
        let comments;

        // The contents of the container with id "comments" in the HTML body is placed inside placeholder

        var placeholder = document.getElementById("comments");

        var i = 0;

        // The async function is used to wait for some sort of return -- essentially it has an await inside the function

        async function fet() {
            const res = await fetch("https://script.google.com/macros/s/AKfycbwm7f9RBUxWlG7OgtHpoJqxXHtY6G7a6HplmMLr6iyF6V6JD89OhlPnzbLSabk5ITk9/exec?postId=" + page);

            // Notice here that postId=page (with "page" here being page-1) is the "query" (think of inquiry, i.e. a request)
            // The way the Firebase access has been formulated is that it will specify a path to get our desired data. We already have "/blog_contact/", but because we want to display comments from a specific page ID, we must be precise

            // One way to do things is to fetch *all* the data we have and filter it on the browser side (likely using comments.[page]), but this is not what we want for this task

            // Hence we can pass this variable (we can also write the value as a string, I simply use "page" for easier referall) off to Apps Script, but since we can't just send off a value on its own, we need a key for it.

            // Therefore "postId" is information not important on the browser side, but it is a keyword that Apps Script will look for. If we use the "packaging" analogy, Apps Script will look for the package called "postId". 





            // await is usually used to unwrap promises by passing a Promise as the expression. Using await pauses the execution of its surrounding async function until the promise is settled (that is, fulfilled or rejected). When execution resumes, the value of the await expression becomes that of the fulfilled promise.

            // Here, the return is returned as JSON and passed into the comments

            comments = await res.json();

            // We make a variable called content, which is currently empty

            var content = ""

            /*function timeFormatter (epochDate) {
                const time = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
                });

                const formatter2 = new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
                });

                const timeHourMinuteAmPm = time.format(new Date());
                const formatterMonthDayYear = formatter2.format(new Date());
                const date = formatterMonthDayYear + ' at ' + timeHourMinuteAmPm

                return date

            };*/

            // Now, we take each entry in the list, put them in a card, append them, and put them in the content variable we just made

            for (key in comments) {
                i += 1;

                console.log(key);

                var name = comments[key].name; // These are just alternative forms of how you can access the path
                var comment = comments[key]["comment"];

                var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
                // var optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
                var date = new Date(comments[key]["date"]);
                var dateDisplayed = date.toLocaleDateString("en-US", options);
                // var timeDisplayed = date.toLocaleDateString("en-US", options);


                // date = timeFormatter(epochDate)

                console.log(name); 
                console.log(comment);
                console.log(dateDisplayed);

                // Creates a variable called card that contains the Bootstrap formatting, and the ${} notation is a string literal that can access a variable inside a string 

                var card = `<div class="card mb-4 border-secondary rounded-0 text-bg-dark">
                    <div class="card-body">
                        <p>
                            <b>${name}</b> says:
                            <br>
                            <small class="text-warning">${dateDisplayed}</small>
                        </p>
                        
                        <p class="mb-2 text-body-secondary">${comment}</p>
                    </div>
                </div>`

                content += card;
                //var newDiv = document.createElement('div');
                //newDiv.innerHTML += `comments (${i}): ${key}`;)
                //placeholder.appendChild(newDiv);

            }

            // Now we put everything we've put inside the content inside the html
            placeholder.innerHTML = content;
            

        }

        fet();




        // Submit comments script

        // We get information on the submit button as well as the alert element

        const btn = document.getElementById('btn'),
        alert = document.getElementById('alert'),
        submissionSuccess = document.getElementById('submissionSuccess')

        // We add an event listener to when the button is clicked...
      
        btn.addEventListener('click', () => {

        // The alert's default state of appearance is "d-none", which hides the element. We remove the d-none so we can show it...
        
        alert.classList.remove('d-none');

        // We wait, then add the d-none property back to the element
        
        setTimeout(() => {
            alert.classList.add('d-none');
        }, 2000)
        
        })


        // We get the element with the id commentForm, and look out for a submit event, which we will execute the postComment function

        document.getElementById('commentForm').addEventListener('submit', postComment);

        //const myModal = document.getElementById('exampleModal')
        //const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

        // After we execute postComment, we show the Bootstrap Modal

        const myModal = new bootstrap.Modal('#notification');
        
        var placeholderNewlySubmitted = document.getElementById("newlySubmitted")
      

        function postComment (event) {

            // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur

            event.preventDefault();

            // We store the contents that we've put inside the form in the consts 

            const name = document.getElementById('inputName').value;
            const comment = document.getElementById('inputComment').value;
            const tempDate = "Moments ago"

            /* const time = new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            });

            const formatter2 = new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            const timeHourMinuteAmPm = time.format(new Date());
            const formatterMonthDayYear = formatter2.format(new Date());
            const date = formatterMonthDayYear + ' at ' + timeHourMinuteAmPm*/

            // XMLHttpRequest is a built-in browser object that allows to make HTTP requests in JavaScript

            const XHR = new XMLHttpRequest();

            // We store the commentForm inside the form

            form = document.getElementById('commentForm');

            // Since we have the XMLHttpRequest() inside the XHR const, it looks out for a "load" event, where it would pass the paramater into a function created immediately... 

            var newlySubmittedContent = "";

            function addNewComment(name, comment, tempDate) {
              var newComment = `<div class="card mb-4 border-secondary rounded-0 text-bg-dark">
                    <div class="card-body">
                        <p>
                            <b>${name}</b> says:
                            <br>
                            <small class="text-warning">${tempDate}</small>
                        </p>
                        
                        <p class="mb-2 text-body-secondary">${comment}</p>
                    </div>
                </div>`

                newlySubmittedContent += newComment;
            };

            XHR.addEventListener("load", (event) => {

                // We're expecting a response from Google Apps Script. If we hear OK, then the modal we made should show.

                if (event.target.responseText == "OK") {
                    console.log("modal should show");
                    
                    // myModal.show();

                    newlySubmitted.classList.remove('d-none');

                    addNewComment(name, comment, tempDate);
                    placeholderNewlySubmitted.innerHTML = newlySubmittedContent;
                    form.classList.add('d-none')

                    submissionSuccess.classList.remove('d-none')

                    setTimeout(() => {
                        submissionSuccess.classList.add('d-none');
                        form.classList.remove('d-none');
                    }, 2000)

                    
                    
                    
                    
                    

                    //$('#exampleModal').modal('show');

                }

                else {
                    console.log("Failed to submit comment...");
                }
            });
            

            // We're also looking out for an error

            XHR.addEventListener("error", (event) => {
                alert("Error: " + event.target.responseText);
            });
            
            // FD.append("thisVariableIsForAppsScriptEmail", thisIsMyVariableCalledEmail);
            // FD.append("thisVariableIsForAppsScriptName", thisIsMyVariableCalledName);

            // Here we post whatever we've just sent via POST method...

            XHR.open("POST", "https://script.google.com/macros/s/AKfycbzeTZMlV9a-Tb3VvTJLYoKdK1IBDLhFLsD3Pgv6rrNpo60IpgdWfJmYN03R7RDEiKdfpA/exec");
            
            jsondata = JSON.stringify({
                    "nameAppsScript": name,
                    "commentAppsScript": comment,
                    "pageAppsScript": page
                });
                
            XHR.send(jsondata);

        }