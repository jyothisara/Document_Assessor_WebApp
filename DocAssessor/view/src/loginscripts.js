
function fn_checkLogin()
{
       //alert("checklogin");
          if (getCookie('userid')!="")
		  {
		    window.location.href = "/home.html";
		  }
		  
}

/*Function to get the usr id and session from the token*/
function fn_getsession(token)
{
           // Creating a XMLHttpRequest object 
            var xmlhttp = new XMLHttpRequest(); 
            var url = "http://localhost:4000/me";
			
			xmlhttp.open("GET", url, true);
			
			
			//alert("token inside getsession"+ token);
			
			 // Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			xmlhttp.setRequestHeader("token", token); //set the token in the header.
			
			xmlhttp.send();
			//alertinside getsession----");
			//alert(document.cookie);
            xmlhttp.onload = function(){
			   //Get the user session details from server.
			   //alert("inside getsession onload----");
			   let res = JSON.parse(xmlhttp.response);
			   var userid = res._id;
			   //alert(userid);
			   var firstname = res.firstName;
			  //alert(firstname);
			   //save the token to cookie for later user use.
			   document.cookie = "userid =";
			   document.cookie = "firstname =";
			   document.cookie = "userid =" +userid;
			   //alert("user id from get session",);
			   document.cookie = "firstname =" +firstname;
			   //alert("user id from get session",firstname);
			   //alert("Document cookie 0000000000000000000000000000"+document.cookie);
			   //..................................................................................
			  
				//sessionStorage.setItem("userid", userid);
				//sessionStorage.setItem("firstname", firstname);
			  
			   
			   //.................................................................................
			   window.location.href = "/home.html";
			   }
}
function fn_sendlogin(form)
{ 
              
            // Creating a XMLHttpRequest object 
            var xmlhttp = new XMLHttpRequest(); 
            var url = "http://localhost:4000/login"; 
            //alert("inside sendform login");
            // open a connection 
            xmlhttp.open("POST", url, true); 
			           
			
            // Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			
			       
            
  
            // Converting JSON data to string 
            var data = JSON.stringify({ "email": form.email.value, "password": form.password.value }); 
			//alert(data);
  
            // Sending data with the request 
            xmlhttp.send(data); 
			
			//xmlhttp.onload = () => window.location.href = "/home.html";//alert(JSON.stringify(xmlhttp.response));//alert(request);//window.location.href = "/home.html";
			
			xmlhttp.onload = function(){
			   //Get the token from the JSON response by parsing it.
			   //let token = JSON.stringify(xmlhttp.response);
			   let res = JSON.parse(xmlhttp.response);
			   		   
			   if(res.token){
			   //save the token to cookie for later user use.
			   document.cookie="token =";
			   document.cookie = "token =" +res.token;
			   //alert("token"+res.token);
			    //alert('document.cookie'+document.cookie);
			   fn_getsession(res.token);
			   
			   }else
			   {
			   //alert(res.message);
			    document.getElementById('loginerror').innerHTML= 'User name or password is incorrect';
			   }
			   //var x = document.cookie;
			   //alert(x);
			   /*TODO : Login fail error conditions to be checked and implemented here*/
               //alert(JSON.stringify(xmlhttp.response));//alert(request);//window.location.href = "/home.html";
			   }
			//alert("This is to test");
			event.preventDefault();
}
function fn_sendregister(form)
{ 
              
            // Creating a XMLHttpRequest object 
            var xmlhttp = new XMLHttpRequest(); 
            var url = "http://localhost:4000/register"; 
        
            // open a connection 
            xmlhttp.open("POST", url, true); 
			        //alert("After open");   
			
            // Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			
			       //alert("After open");   
            
  
            // Converting JSON data to string 
           
            var data = JSON.stringify({ "firstName": form.firstName.value,"lastName": form.lastName.value,"userName": form.userName.value,"email": form.registeremail.value,"password": form.registerpassword.value}); 			
            
            // Sending data with the request 
            xmlhttp.send(data); 
			
			//xmlhttp.onload = () => window.location.href = "/home.html";//alert(JSON.stringify(xmlhttp.response));//alert(request);//window.location.href = "/home.html";
			
			xmlhttp.onload = function(){
			   //Get the token from the JSON response by parsing it.
			   //let token = JSON.stringify(xmlhttp.response);
			   
			   let res = JSON.parse(xmlhttp.response);
			   //alert("onload token"+res.token); 
			   document.getElementById('registererror').innerHTML= ' ';
			   if(res.token){
			   
			   fn_getsession(res.token);
			    
			   }else
			   {
			   alert(res.msg);
			   document.getElementById('registererror').innerHTML= 'User by email already exists!';
			   }
			   //var token = res.token;
			   
			   //save the token to cookie for later user use.
			   
			   //var x = document.cookie;
			   //alert(x);
			   /*TODO : Login fail error conditions to be checked and implemented here*/
              //alert(JSON.stringify(xmlhttp.response));//alert(request);//window.location.href = "/home.html";
			   }
			//alert("This is to test");
			event.preventDefault();
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function fn_signout()
{
     //alert("Inside signout");
     if (getCookie('userid')!="")
		  {
		  //alert("Inside signout");
		    document.cookie = "userid =";
			document.cookie = "firstname =";
			window.location.href = "/index.html";
		  }

}
function fn_setusername()
{
     //alert(getCookie('firstname'));
	// document.getElementById('uname').innerHTML= 'Welcome ' +getCookie('firstname');
		 document.getElementById('uname').innerHTML= 'Welcome ' +getCookie('firstname');
		// alert(document.getElementById('uname').innerHTML= 'Welcome ' +getCookie('firstname'));
		//alert('localStorage.getItem("firstname")'+sessionStorage.getItem("firstname"));
		//document.getElementById("uname").innerHTML = sessionStorage.getItem("firstname");

}