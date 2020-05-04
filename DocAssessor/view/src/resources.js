function fn_renderResourceTable(response){

setId    = [];
let datat=response;

for(var i = 0; i < datat.length; i++) {



document.getElementById('taskId').innerHTML=getCookie('title');
setId[i]=[datat[i]._id].toString();


let setLink=[datat[i].link];

}

let objTable				= document.getElementById('table');
let strTableData			='';


	strTableData 				= strTableData + '<table width="100%" style="border: 1px solid black;">';
	strTableData 				= strTableData + '<tr style="border: 1px solid black;background-color: #1a75ff">';

	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> ID </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Resources </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Assessment Form </td>';


	strTableData 				= strTableData + '</tr> ';
	for(var i = 0; i < datat.length; i++){
	
			strTableData 				= strTableData + '<tr style="border: 2px solid black;">';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;"> '+ (i+ 1)+' </td>';	
			//strTableData 				= strTableData + '	<td style="border: 2px solid black;"> '+[datat[i].task]+'</td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;"> <a href="'+[datat[i].link]+'">'+[datat[i].task]+'<a></td>';
			if(datat[i].submissionStatus == false){
			strTableData 				= strTableData + '	<td style="border: 2px solid black;">'+ '<input type="button" value="Submit Assessment" onclick="fn_navResources('+'setId['+i+']'+');">'+' </td>';
			}
			else{
			strTableData 				= strTableData + '	<td style="border: 2px solid black;">'+ '<div> Assesment already submitted</div>'+' </td>';			
			}
			strTableData 				= strTableData + '</tr>';
		
	}
		strTableData 				= strTableData + '</table>'	;
	objTable.innerHTML	= strTableData;

}
function fn_navResources(data){

document.cookie = "resourceId =" +data;
 window.location.href = "/Assessment.html";
}


//****************************************************
function fn_getresources()
{
//let reso = resources.toString();
            var userid = getCookie('userid');
			 var assessmentid = getCookie('assessmentid');
            var xmlhttp = new XMLHttpRequest(); 
            //var url = "http://localhost:4000/me";
			/*assessment id hard coded for now*/
			var url = "http://localhost:4000/user/"+userid+"/assessment/"+assessmentid;
							

			//var url = "http://localhost:4000/user/"+userid+"/assessment/"+"5e9778510ae08b2324a96284";
			//alert(url);
			xmlhttp.open("GET", url, true);
			// Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			//xmlhttp.setRequestHeader("token", token); //set the token in the header.
			
			xmlhttp.send();

            xmlhttp.onload = function(){
			   //Get the user session details from server.
			   let res = JSON.parse(xmlhttp.response);
				//alert(res[0].form);
				fn_renderResourceTable(res);
			   }
}
//Funtion to submit the assessment form
function fn_sendassessment(form)
{ 
             var userid = getCookie('userid'); 
			  var assessmentid = getCookie('assessmentid'); 
			   var resourceId = getCookie('resourceId'); 
			   
            // Creating a XMLHttpRequest object 
            var xmlhttp = new XMLHttpRequest(); 
            //var url = "http://localhost:4000/login"; 
            var url = "http://localhost:4000/user/"+userid+"/assessment/"+assessmentid+"/resource/"+resourceId;
            // open a connection 
			
            xmlhttp.open("POST", url, true); 
			           
			
            // Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			
			       
            
  
            // Converting JSON data to string 
            var data = JSON.stringify({ "text": form.feedback.value, "rating": form.rating.value }); 
  
            // Sending data with the request 
            xmlhttp.send(data); 
			
			//xmlhttp.onload = () => window.location.href = "/home.html";//alert(JSON.stringify(xmlhttp.response));//alert(request);//window.location.href = "/home.html";
			
			xmlhttp.onload = function(){
			   //Get the token from the JSON response by parsing it.
			   //let token = JSON.stringify(xmlhttp.response);
			   let res = JSON.parse(xmlhttp.response);
			   
			   //alert("response after form submission"+res);
			   $('#successModal').modal('show')
			   }
			//alert("This is to test");
			event.preventDefault();
}
function fn_redirect(){
   window.location.href = "/Resources.html";

}