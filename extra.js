	/* LOAD XML FUNCTION */
function loadXMLDoc(dname) {	
if (window.XMLHttpRequest)
{
xhttp=new XMLHttpRequest();
}
else
{
xhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xhttp.open("GET",dname,false);
xhttp.send();
return xhttp.responseXML;


}




/* LOAD XML DOC 	*/
xmlDoc=loadXMLDoc("users.xml");
users = [];
users = xmlDoc.getElementsByTagName("users")[0].childNodes;
t = users[0].getAttributeNode("nameFirst").nodeValue;
alert(t);