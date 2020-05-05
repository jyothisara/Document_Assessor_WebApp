/**************************************************************
*   resources.js
*   This file includes the javascripts functions required for
*   getting the resources for assemsnt task and submit the assessment
*   for a resource.
*   @Author : Sandhya Sebastian
*   Reference : https://www.w3schools.com/js/
*             : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
**************************************************************/


/*************************************************************
*   fn_renderResourceTable(response)
*   This function will render the list of resouces in an assessment  
*   task already signed up by the user.
***************************************************************/
function fn_renderResourceTable(response){

	setId    = [];
	let datat=response;

	for(var i = 0; i < datat.length; i++) {
		/*Get the id and link for each resource*/
		document.getElementById('taskId').innerHTML=getCookie('title');
		setId[i]=[datat[i]._id].toString();
		let setLink=[datat[i].link];
	}

	let objTable				= document.getElementById('table');
	let strTableData			='';

    /*Define the table to display id,resource link and the button to submit assessment */
	strTableData 				= strTableData + '<table width="100%" style="border: 1px solid black;">';
	strTableData 				= strTableData + '<tr style="border: 1px solid black;background-color: #1a75ff">';

	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> ID </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Resources </td>';
	strTableData 				= strTableData + '	<td style="border: 1px solid black;"> Assessment Form </td>';

    strTableData 				= strTableData + '</tr> ';
	
	/*Display the data in the table*/
	for(var i = 0; i < datat.length; i++){
	
		strTableData 				= strTableData + '<tr style="border: 2px solid black;">';
		strTableData 				= strTableData + '	<td style="border: 2px solid black;"> '+ (i+ 1)+' </td>';	
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

/*************************************************************
*   fn_navResources(data)
*   Helper function to navigate to the assessment page. 
**************************************************************/
function fn_navResources(data){
    /*Store the resource id in the cookie*/
	document.cookie = "resourceId =" +data;
	
	/*Navigate to the assessment page*/
	window.location.href = "/Assessment.html";
}

/*************************************************************
*   fn_getresources()
*   This function will retrieve the list of resources for the 
*   assessment signed up by the user.
***************************************************************/
function fn_getresources()
{
    /*get the user id and assessment id from cookie*/
	var userid = getCookie('userid');
	var assessmentid = getCookie('assessmentid');
	
	/* Creating a XMLHttpRequest object*/
	var xmlhttp = new XMLHttpRequest(); 
	
	/*Set the url to retrieve resource information*/
	var url = "http://localhost:4000/user/"+userid+"/assessment/"+assessmentid;
	
    /*Open the connection*/	
	xmlhttp.open("GET", url, true);
	
	/*Set the request header with the content type*/
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 
	
    /*Send the request*/	
	xmlhttp.send();

	xmlhttp.onload = function(){
		/*Get the resource details from server reposne*/
	    let res = JSON.parse(xmlhttp.response);
		
		/*Render the reasource details in a table*/
		fn_renderResourceTable(res);
	}
}

/*************************************************************
*   fn_sendassessment(form)
*   This function will submit the assessment for for the specific  
*   resource submitted by the user.
***************************************************************/
function fn_sendassessment(form)
{ 
    /*get the user id ,assessment id and resource id from cookie*/
	var userid = getCookie('userid'); 
	var assessmentid = getCookie('assessmentid'); 
	var resourceId = getCookie('resourceId'); 
		   
	/* Creating a XMLHttpRequest object*/ 
	var xmlhttp = new XMLHttpRequest();
	
	/*Set the url to retrieve user information*/ 
	var url = "http://localhost:4000/user/"+userid+"/assessment/"+assessmentid+"/resource/"+resourceId;
	
    /*Open the connection*/
	xmlhttp.open("POST", url, true); 
				   
    /*Set the request header with the content type*/ 
	xmlhttp.setRequestHeader("Content-Type", "application/json"); 

	/*Send the request with the data submitted by user*/ 
	var data = JSON.stringify({ "text": form.feedback.value, "rating": form.rating.value }); 
	xmlhttp.send(data); 
    
	xmlhttp.onload = function(){
		/*Get the server reposne*/
		let res = JSON.parse(xmlhttp.response);
	    
		/*Show the successmodal to display the message from server*/
		$('#successModal').modal('show')
	}
	event.preventDefault();
}

/*************************************************************
*   fn_redirect()
*   Function to redirect to resources page after submitting the
*   assessment
***************************************************************/
function fn_redirect(){
	/*Navigate to the resources page*/
	window.location.href = "/Resources.html";
}