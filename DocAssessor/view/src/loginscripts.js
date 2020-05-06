/**************************************************************
*   loginscripts.js
*   This file includes the javascripts functions required for
*   the login and logout functionalities.
*   @Author : Sandhya Sebastian
*   Reference : https://www.w3schools.com/js/
*             : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
**************************************************************/

/*************************************************************
*   fn_checkLogin()
*   This function will check whether any user is already logged 
*   in by checking the cookie 'user id' and navigate to user's
*   home page.
***************************************************************/

function fn_checkLogin()
{
    /*If userid is available in cookie, navigate to user's home page*/    
    if (getCookie('userid')!="")
	{
		window.location.href = "/home.html";
	}
		  
}

/*************************************************************
*   fn_getsession(token)
*   This function will retrieve the suer information from the 
*   server by sending and xmlhttp request with the valid token.
*   Once received the user id and name is will be stored in cookies.
***************************************************************/
function fn_getsession(token)
{
	/*Creating a XMLHttpRequest object*/ 
	var xmlhttp = new XMLHttpRequest(); 
	
	/*Set the url to retrieve user information*/
	var url = "http://localhost:4000/me";
	
	/*Open the connection*/
	xmlhttp.open("GET", url, true);
	
			
	/*Set the request header with the content type and the token*/ 
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	xmlhttp.setRequestHeader("token", token); //set the token in the header.
	
	/*Send the request*/
	xmlhttp.send();
	
	xmlhttp.onload = function(){
	   /*Get the user session details from server reposne*/
	   let res = JSON.parse(xmlhttp.response);
	   var userid = res._id;
	   var firstname = res.firstName;
	  
	   /*save the user information to cookies*/
	   document.cookie = "userid =";
	   document.cookie = "firstname =";
	   document.cookie = "userid =" +userid;
	   document.cookie = "firstname =" +firstname;
	   
	   /*Navigate to user's home page*/	   
	   window.location.href = "/home.html";
	}
}

/*************************************************************
*   fn_sendlogin(form)
*   This function will be invoked by the login modal where user 
*   enter the login credentials.The data will be send to the server
*	through a xmlhttp request.On successful login server will send *
*	a token for the session. 
***************************************************************/
function fn_sendlogin(form)
{ 
              
	/* Creating a XMLHttpRequest object*/ 
	var xmlhttp = new XMLHttpRequest(); 
	
	/*Set the url to retrieve user information*/
	var url = "http://localhost:4000/login"; 
	
	/*Open the connection*/
	xmlhttp.open("POST", url, true); 
			   
	
	/*Set the request header with the content type*/ 
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	
	
	/*Converting JSON data to string and send to server*/ 
	var data = JSON.stringify({ "email": form.email.value, "password": form.password.value }); 
	xmlhttp.send(data); 
	
	xmlhttp.onload = function(){
	    /*Get the token from the JSON response by parsing it*/
		let res = JSON.parse(xmlhttp.response);
			   
		if(res.token){
		/*if valid token,save the token to cookie*/
			fn_getsession(res.token);
		}else
		{
			/*Display the login error*/
			document.getElementById('loginerror').innerHTML= 'User name or password is incorrect';
		}
	}
	event.preventDefault();
}

/*************************************************************
*   fn_sendregister(form)
*   This function will be invoked by the register modal where user 
*   enter the register details.The data will be send to the server
*	through a xmlhttp request.On successful user registration server
*   will send a token for the session. 
***************************************************************/
function fn_sendregister(form)
{ 
	  
	/* Creating a XMLHttpRequest object*/ 
	var xmlhttp = new XMLHttpRequest(); 
	
	/*Set the url to retrieve user information*/
	var url = "http://localhost:4000/register"; 

	/*Open the connection*/
	xmlhttp.open("POST", url, true); 
		 
	
	/*Set the request header with the content type*/ 
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	
	/*Validate the username and password length*/
	if((form.userName.value).length < 6)
	{
		document.getElementById('usernamererror').innerHTML= 'Username must be 6 or more characters';
		
	}else if((form.registerpassword.value).length < 6)
	{
		document.getElementById('passwordrerror').innerHTML= 'Password must be 6 or more characters';
		
	}
	else{
		/*Set the request header with the content type*/ 
	   	var data = JSON.stringify({ "firstName": form.firstName.value,"lastName": form.lastName.value,"userName": form.userName.value,"email": form.registeremail.value,"password": form.registerpassword.value}); 			
		
		/*Send the request*/
		xmlhttp.send(data); 
		
		xmlhttp.onload = function(){
		    /*Get the token from the JSON response by parsing it*/
		    let res = JSON.parse(xmlhttp.response);
		   
		    document.getElementById('registererror').innerHTML= ' ';
		    if(res.token){
				/*On successful user registration display the message and go to login modal.*/
				document.getElementById('loginerror').innerHTML= 'User registered successfully.Login here.';
				$('#registerModal').modal('hide')
				$('#loginModal').modal('show')
			
		    }else
		    {   
		        /*Display the error message if registration failed*/
				document.getElementById('registererror').innerHTML= 'User by email already exists!';
		    }
		   
	    }
	}
	event.preventDefault();
}
/*************************************************************
*   getCookie(cname)
*   This function will give the value stored in the cookie given 
*   by the parameter 'cname'.
*   Reference: https://www.w3schools.com/js/js_cookies.asp 
***************************************************************/
function getCookie(cname) {
var name = cname + "=";
	/*decode the cookie*/
	var decodedCookie = decodeURIComponent(document.cookie);
	/*split each of the cookie value*/
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		/*Return the value in cookie cname*/
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/*************************************************************
*   fn_signout()
*   Function will sign out the user by removing all the user 
*   information stored in cookies.
***************************************************************/
function fn_signout()
{
	if (getCookie('userid')!="")
	{
		/*Remove the user information stored in cookie to sign out*/
		document.cookie = "userid =";
		document.cookie = "firstname =";
		
		/*Navigate to index page*/
		window.location.href = "/index.html";
	}
}

/*************************************************************
*   fn_setusername()
*   Function to display user's name in the pages after login.
***************************************************************/
function fn_setusername()
{   
    /*Display first name of the user*/
    document.getElementById('uname').innerHTML= 'Welcome ' +getCookie('firstname');
}

/*************************************************************
*   fn_redirect()
*   Function to redirect to login modal after user registration.
***************************************************************/
function fn_redirect(){
    /*Show the login modal*/	
    $('#loginModal').modal('show')
}