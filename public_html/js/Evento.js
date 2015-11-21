
var CLIENT_ID = '439520072436-uf4gs63ivhul10p46vmqtjlso2da4vr6.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/plus.me"];

      /**
       * Check if current user has authorized this application.
       */
function checkAuth() {
gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          });
      }
      
  //window.onload = checkAuth;
function comprobarCheck(){
    
    if(document.getElementById("c1").checked){alert("ok");return '1';};
    if(document.getElementById("c2").checked){return '2';}
    if(document.getElementById("c3").checked){return '3';}
    if(document.getElementById("c4").checked){return '4';}
    if(document.getElementById("c5").checked){return '5';}
    if(document.getElementById("c6").checked){return '6';}
    if(document.getElementById("c7").checked){return '7';}
    if(document.getElementById("c8").checked){return '8';}
    if(document.getElementById("c9").checked){return '1';}
    if(document.getElementById("c10").checked){return '10';}
    if(document.getElementById("c11").checked){return '11';}
};
var Correos = [];

function AgregarCorreo(){
    Correos.push({'email': document.getElementsByName("Invitado")[0].value});
    document.getElementsByName("Invitado")[0].value="";
};
        
// FUNCTION TO INSERT EVENT
function AgregarEvento() {
   var Cuerpo = {'summary': document.getElementsByName("summary")[0].value};

if(document.getElementsByName("summary")[0].value===""){alert("Por favor gregue un titulo"); return;};
if(document.getElementsByName("end")[0].value==="" && document.getElementsByName("start")[0].value==="" ){alert("Por favor gregue una fecha de inicio o fin "); return;};


if(document.getElementsByName("hora1")[0].value===""){
    Cuerpo.start = {'date': document.getElementsByName("start")[0].value}
}else{Cuerpo.start = {'dateTime': document.getElementsByName("start")[0].value + 'T'+ document.getElementsByName("hora1")[0].value+':00-06:00'}};

if(document.getElementsByName("hora2")[0].value===""){
    Cuerpo.end = {'date': document.getElementsByName("end")[0].value}
}else{Cuerpo.end = {'dateTime': document.getElementsByName("end")[0].value + 'T'+ document.getElementsByName("hora2")[0].value+':00-06:00'}};

if(!(document.getElementsByName("location")[0].value==="")){
    Cuerpo.location = document.getElementsByName("location")[0].value;
};
if(!(document.getElementsByName("description")[0].value==="")){Cuerpo.description = document.getElementsByName("description")[0].value;};
if(!(document.getElementsByName("reminders")[0].value==="")){
    Cuerpo.reminders = {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': parseInt(document.getElementsByName("reminders")[0].value) * 60},
      {'method': 'popup', 'minutes': parseInt(document.getElementsByName("reminders")[0].value) * 60}
    ]        
};}
else{Cuerpo.reminders = {'useDefault': false}};

if(!(Correos.length===0)){Cuerpo.attendees = Correos;}
Cuerpo.colorId=comprobarCheck();

    gapi.client.load('calendar', 'v3', function() {  
       var request = gapi.client.calendar.events.insert({
         'calendarId': 'primary',
	 'resource': Cuerpo
       });
     request.execute(function(resp) {
       console.log(resp);
	  if (resp.id){
	  	alert("Event was successfully added to the calendar!");
	  }
	  else{
	  	alert("An error occurred. Please try again later.")
	  }
       
     });
     });
     
   } 
   
   function CargarNombreUsuario() {
  gapi.client.load('plus', 'v1').then(function() {
    
    
    var request = gapi.client.plus.people.get({
  'userId' : 'me'
    });
  
  
  request.execute(function(resp) {
      
  document.getElementById("Label1").innerHTML = resp.displayName;
  console.log('ID: ' + resp.id);
  console.log('Display Name: ' + resp.displayName);
  console.log('Image URL: ' + resp.image.url);
  console.log('Profile URL: ' + resp.url);
});
    
    
    
  });
}




