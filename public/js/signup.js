$(document).ready(function() {
    ​
    let signUpForm = $('form.signup')
    let nameInput = $('#user-input');
    let lastnameInput = $('#lastname-input');
    let emailInput = $('#email-input');
    ​
    ​
    ​
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        name: nameInput.val().trim(),
        lastname: lastnameInput.val().trim(),
        email: emailInput.val().trim()
      };
      //if empty return
      if (!userData.name || !userData.lastname || !userData.email) {
        return;
      }
      // If we have a name and lastname, run function
      registerUser(userData.name, userData.lastname, userData.email);
      nameInput.val("");
      lastnameInput.val("");
      emailInput.val("");
    });
    ​
    // Post to the signup route. If successful, we are redirected to the home page
    function registerUser(name, lastname, email) {
      $.post("/api/signup", {
        name: name,
        lastname: lastname,
        email: email
      })

        .then(function(data) {
        
          //add email to localStorage
          // localStorage.setItem
          window.location.replace("/home");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        
    }
    

    ​
    ​
    ​
    });

    //BONUS: create a button / link for "Skip registration"
    //onCLick of skip registration, 
    //add some some special value that represents a "guest" user to local storage
    //manually create a database entry for "guest" user with an email matching the above special value
    //that way we will fool our /api/users/:email route into thinking the current user exists
    
    // Signup.js is setting our items in local storage
    // The script we added into home.handlebars is what is getting that item via local storage and then displaying it