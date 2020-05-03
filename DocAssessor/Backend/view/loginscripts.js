			//Retrive the user name from cookie to display in home page.
			/*Reference w3schools*/
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
		  alert("Inside signout");
		    document.cookie = "userid =";
			document.cookie = "firstname =";
			window.location.href = "/index.html";
		  }

}