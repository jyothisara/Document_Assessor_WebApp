

function fn_getmyassessments()
{
            //get the user id from cookie
			var userid = getCookie('userid');
			//alert("userid from getassessments "+userid);
            var xmlhttp = new XMLHttpRequest(); 
			var url = "http://localhost:4000/user/"+userid;
			
			xmlhttp.open("GET", url, true);
			 // Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			//xmlhttp.setRequestHeader("token", token); //set the token in the header.
			
			xmlhttp.send();

            xmlhttp.onload = function(){
			   //Get the user session details from server.
			   response= JSON.parse(xmlhttp.response);
				//alert(1);
				
				var names = response.map(function(item) {
				  return item['description'];
				 
				});
				 fn_rendermytasksTable(response);
			   }   
}
function fn_rendermytasksTable(response){
setId =[];
setTitle= [];
let datat=response;

for(var i = 0; i < datat.length; i++) {
   // delete jsonArry[i]['YYY'];
 setId[i]=[datat[i]._id].toString();

 setTitle[i]=[datat[i].title];


}

let objTable				= document.getElementById('table');
let strTableData			='';


	strTableData 				= strTableData + '<table width="100%" style="border: 1px solid black; table-layout: fixed;">';
	strTableData 				= strTableData + '<tr style="border: 1px solid black;background-color: #1a75ff">';
	//strTableData 				= strTableData + '	<td style="border: 1px solid black;"> ID </td>';
	
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Title </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Description </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Instruction </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> No.of resources </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Resources </td>';

	strTableData 				= strTableData + '</tr>';
	for(var i = 0; i < datat.length; i++){
	
		if(datat[i].userSignup == true){
			strTableData 				= strTableData + '<tr style="border: 2px solid black;">';
			//strTableData 				= strTableData + '	<td style="border: 2px solid black;"> '+ i+' </td>';
				
			strTableData 				= strTableData + '	<td style="border: 2px solid black; style="word-wrap: break-word;"> '+[datat[i].title]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;" > '+[datat[i].description]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black; word-wrap:break-word"> <a href="'+[datat[i].instructions]+'">'+ 'Instruction Details<a>' +'</td>';	
			strTableData 				= strTableData + '	<td style="border: 2px solid black; word-wrap:break-word;text-align=center"> '+[datat[i].numAssessmentsPerUser]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;">'+ '<input type="button" value="view resources" style="background-color: #66b3ff;" onclick="fn_navResources('+'setId['+i+']'+','+'setTitle['+i+']'+');">'+' </td>';
			
			strTableData 				= strTableData + '</tr>';
			}
	}
		strTableData 				= strTableData + '</table>';
	objTable.innerHTML	= strTableData;

}
function fn_getassessments()
{
            //get the user id from cookie
			var userid = getCookie('userid');
			//alert("userid from getassessments "+userid);
            var xmlhttp = new XMLHttpRequest(); 
			var url = "http://localhost:4000/user/"+userid;
			
			xmlhttp.open("GET", url, true);
			 // Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			//xmlhttp.setRequestHeader("token", token); //set the token in the header.
			
			xmlhttp.send();

            xmlhttp.onload = function(){
			   //Get the user session details from server.
			   response= JSON.parse(xmlhttp.response);
				//alert(1);
				
				var names = response.map(function(item) {
				  return item['description'];
				 
				});
				 fn_renderTable(response);
			   }   
}
function fn_renderTable(response){
setId =[];
let datat=response;

for(var i = 0; i < datat.length; i++) {
   // delete jsonArry[i]['YYY'];
let setResources=[datat[i].resources];
let setUser=[datat[i].userSignup];
 setId[i]=[datat[i]._id].toString();
let setassess=[datat[i].numAssessmentsPerUser];
let setdesc=[datat[i].description];
let setinst=[datat[i].instructions];
let setTitle=[datat[i].title];

}

let objTable				= document.getElementById('table');
let strTableData			='';


	strTableData 				= strTableData + '<table width="100%" style="border: 1px solid black; table-layout: fixed;">                  	'                   ;
	strTableData 				= strTableData + '<tr style="border: 1px solid black;background-color: #1a75ff">                      '                   ;
	//strTableData 				= strTableData + '	<td style="border: 1px solid black;"> ID </td>        '                   ;
	
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Title </td>        '                   ;
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Description </td>  '                   ;
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Instruction </td>  '                   ;
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> No.of resources </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Sign up task </td>  '                   ;

	strTableData 				= strTableData + '</tr>                     '                   ;
	for(var i = 0; i < datat.length; i++){
	
		if(datat[i].userSignup != true){
		    
			strTableData 				= strTableData + '<tr style="border: 2px solid black;">';
			//strTableData 				= strTableData + '	<td style="border: 2px solid black;"> '+ i+' </td>';
				
			strTableData 				= strTableData + '	<td style="border: 2px solid black;"> '+[datat[i].title]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;" > '+[datat[i].description]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black; word-wrap:break-word"> <a href="'+[datat[i].instructions]+'">'+ 'Instruction Details<a>' +'</td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black; word-wrap:break-word;text-align=center"> '+[datat[i].numAssessmentsPerUser]+' </td>';			
			strTableData 				= strTableData + '	<td style="border: 2px solid black;">'+ '<input type="button" value="Sign Up" style="background-color: #66b3ff;" onclick="fn_displaysignupmodal('+'setId['+i+']'+');">'+' </td>';
			
			strTableData 				= strTableData + '</tr>';
			}
	}
		strTableData 				= strTableData + '</table>';
	objTable.innerHTML	= strTableData;

}
function fn_displaysignupmodal(assessmentid){
  document.cookie = "assessmentid =" +assessmentid;
  $('#SignupModal').modal('show')
}
function fn_navResources(Id,Title){

//fn_getresources(setId);

//alert('setTitle'+setTitle);
document.cookie = "assessmentid =" +Id;
document.cookie = "title =" +Title;

//alert('title'+Title);


//document.cookie = "title =" +setId;
   window.location.href = "/Resources.html";
}
function fn_signup()
{
            var userid = getCookie('userid');
			var assessmentid = getCookie('assessmentid');
            var xmlhttp = new XMLHttpRequest(); 
            //var url = "http://localhost:4000/me";
			/*assessment id hard coded for now*/
			var url = "http://localhost:4000/user/"+userid+"/assessment-signup/"+assessmentid;
			//var url = "http://localhost:4000/user/"+userid+"/assessment-signup/"+"5e9778510ae08b2324a96284";
			//alert(url);
			xmlhttp.open("POST", url, true);
			// Set the request header i.e. which type of content you are sending 
            xmlhttp.setRequestHeader("Content-Type", "application/json"); 
			//xmlhttp.setRequestHeader("token", token); //set the token in the header.
			
			xmlhttp.send();
			
			
            xmlhttp.onload = function(){
			   //Get the user session details from server.
			   let res = JSON.parse(xmlhttp.response);
			   //alert(res.message);
			   /*var userid = res._id;
			   var firstname = res.firstName;*/
			   //alert("response received");
			   //alert(res[1].description);
			   //save the token to cookie for later user use.
			   window.location.href = "/All_Tasks.html";
			   //document.cookie = "firstname =" +firstname;
			   
			   }
}