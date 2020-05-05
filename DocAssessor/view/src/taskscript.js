/**************************************************************
*   taskscript.js
*   This file includes the javascripts functions required for
*   retreiving the assessment task and sign up.
*   @Author : Sandhya Sebastian
*   Reference : https://www.w3schools.com/js/
*             : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
**************************************************************/

/*************************************************************
*   fn_getmyassessments()
*   This function will retrieve the assessments for the user 
*   from the server.
***************************************************************/

function fn_getmyassessments()
{
	
	/*get the user id from cookie*/
	var userid = getCookie('userid');
	
	/*Create a XMLHttpRequest object*/
	var xmlhttp = new XMLHttpRequest(); 
	
	/*Set the url to retrieve user information*/
	var url = "http://localhost:4000/user/"+userid;
    
    /*Open the connection*/	
	xmlhttp.open("GET", url, true);
	
	/*Set the request header with the content type*/ 
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	
	/*Send the request*/
	xmlhttp.send();

	xmlhttp.onload = function(){
	    /*Get the assessment tasks details from server reposne*/
	    response= JSON.parse(xmlhttp.response);
				
		var names = response.map(function(item) {
		  return item['description'];
		 
		});
		
		/*Render the assessment tasks details in a table*/
		fn_rendermytasksTable(response);
	}   
}

/*************************************************************
*   fn_rendermytasksTable(response)
*   This function will render the assessments tasks which are  
*   already signed up by the user.
***************************************************************/
function fn_rendermytasksTable(response){
	
	/*Get the data from the response*/
	setId =[];
	setTitle= [];
	let datat=response;

	for(var i = 0; i < datat.length; i++) {
		/*Get the assessment id and title for each task*/
		setId[i]=[datat[i]._id].toString();
		setTitle[i]=[datat[i].title];
	}
    
    /*Define the table to display Title,description, instruction, no.of resources and resources for the signed up tasks.*/	
	let objTable				= document.getElementById('table');
	let strTableData			='';

	strTableData 				= strTableData + '<table width="100%" style="border: 2px solid black; table-layout: fixed;">';
	strTableData 				= strTableData + '<tr style="border: 1px solid black;background-color: #1a75ff">';
		
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Title </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Description </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Instruction </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> No.of resources </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Resources </td>';

	strTableData 				= strTableData + '</tr>';
	
	/*Display the data in the table*/
	for(var i = 0; i < datat.length; i++){
	
		if(datat[i].userSignup == true){
			strTableData 				= strTableData + '<tr style="border: 2px solid black;">';
							
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black; style="word-wrap: break-word;"> '+[datat[i].title]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;" > '+[datat[i].description]+' </td>';
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black; word-wrap:break-word"> <a href="'+[datat[i].instructions]+'">'+ 'Instruction Details<a>' +'</td>';	
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black; word-wrap:break-word;text-align=center"> '+[datat[i].numAssessmentsPerUser]+' </td>';
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;">'+ '<input type="button" value="view resources" style="background-color: #66b3ff;" onclick="fn_navResources('+'setId['+i+']'+','+'setTitle['+i+']'+');">'+' </td>';
			
			strTableData 				= strTableData + '</tr>';
		}
	}
	strTableData 				= strTableData + '</table>';
	objTable.innerHTML	= strTableData;

}

/*************************************************************
*   fn_getassessments()
*   This function will retrieve the assessments for the user 
*   from the server which the user can sign up.
***************************************************************/
function fn_getassessments()
{
	/*get the user id from cookie*/
	var userid = getCookie('userid');
	
	/* Creating a XMLHttpRequest object*/
	var xmlhttp = new XMLHttpRequest();
	
	/*Set the url to retrieve user information*/
	var url = "http://localhost:4000/user/"+userid;
	
	/*Open the connection*/
	xmlhttp.open("GET", url, true);
	
    /*Set the request header with the content type and the token*/	
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	
	/*Send the request*/
	xmlhttp.send();

	xmlhttp.onload = function(){
	    /*Get the assessment tasks details from server reposne*/
	    response= JSON.parse(xmlhttp.response);
			
		var names = response.map(function(item) {
			return item['description'];
		 
		});
		
		/*Render the assessment tasks details in a table*/
		fn_renderTable(response);
    }   
}



/*************************************************************
*   fn_renderTable(response)
*   This function will render the assessments tasks which are  
*   assigned to the user to signup
***************************************************************/
function fn_renderTable(response){

	setId =[];
	let datat=response;
	
    /*Get the data from the response*/
	for(var i = 0; i < datat.length; i++) {
	   
		let setResources=[datat[i].resources];
		let setUser=[datat[i].userSignup];
		 setId[i]=[datat[i]._id].toString();
		let setassess=[datat[i].numAssessmentsPerUser];
		let setdesc=[datat[i].description];
		let setinst=[datat[i].instructions];
		let setTitle=[datat[i].title];

	}
    

    /*Define the table to display Title,description, instruction, no.of resources and signup button.*/	
	let objTable				= document.getElementById('table');
	let strTableData			='';


	strTableData 				= strTableData + '<table width="100%" style="border: 2px solid black; table-layout: fixed;">';
	strTableData 				= strTableData + '<tr style="border: 1px solid black;background-color: #1a75ff">';
		
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Title </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Description </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Instruction </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> No.of resources </td>';
	strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> Sign up task </td>';

	strTableData 				= strTableData + '</tr>';
	
	/*Display the data in the table*/
	for(var i = 0; i < datat.length; i++){
	
		if(datat[i].userSignup != true){
		  	strTableData 				= strTableData + '<tr style="border: 2px solid black;">';
							
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;"> '+[datat[i].title]+' </td>';
			strTableData 				= strTableData + '	<td style="border: 2px solid black;" > '+[datat[i].description]+' </td>';
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black; word-wrap:break-word"> <a href="'+[datat[i].instructions]+'">'+ 'Instruction Details<a>' +'</td>';
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black; word-wrap:break-word;text-align=center"> '+[datat[i].numAssessmentsPerUser]+' </td>';			
			strTableData 				= strTableData + '	<td class="align" style="border: 2px solid black;">'+ '<input type="button" value="Sign Up" style="background-color: #66b3ff;" onclick="fn_displaysignupmodal('+'setId['+i+']'+');">'+' </td>';
			
			strTableData 				= strTableData + '</tr>';
		}
	}
	strTableData 				= strTableData + '</table>';
	objTable.innerHTML	= strTableData;

}

/*************************************************************
*   fn_displaysignupmodal()
*   This function will display the signup modal to get confirmation 
*   from the user to signup for an assessment task.
***************************************************************/
function fn_displaysignupmodal(assessmentid){
  
  /*Store the assessment id in cookie*/	
  document.cookie = "assessmentid =" +assessmentid;
  
  /*Show the signup modal*/
  $('#SignupModal').modal('show')
}

/*************************************************************
*   fn_navResources(Id,Title)
*   Helper function to navigate to the resources page. 
**************************************************************/
function fn_navResources(Id,Title){

	/*Store the assessment id and title in cookie*/
	document.cookie = "assessmentid =" +Id;
	document.cookie = "title =" +Title;
	
    /*Navigate to the resource page*/ 
    window.location.href = "/Resources.html";
}

/*************************************************************
*   fn_signup()
*   This function will send the signup request for a specific
*   assessment task selected by the user.     
****************************************************************/
function fn_signup()
{
	/*get the user id from cookie*/
	var userid = getCookie('userid');
	var assessmentid = getCookie('assessmentid');
	
	/*Creating a XMLHttpRequest object*/
	var xmlhttp = new XMLHttpRequest(); 
	
	/*Set the url to signup for a task*/
	var url = "http://localhost:4000/user/"+userid+"/assessment-signup/"+assessmentid;
	
	/*Open the connection*/
	xmlhttp.open("POST", url, true);
	 
	/*Set the request header with the content type*/
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	
	/*Send the request*/
	xmlhttp.send();
	
	
	xmlhttp.onload = function(){
		/*Get the response from from server.*/
		let res = JSON.parse(xmlhttp.response);

		/*Refresh the page*/
		window.location.href = "/All_Tasks.html";
	}
}