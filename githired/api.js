var url = "https://jooble.org/api/";

var key = "ec5e7f3c-25e2-4016-be55-b47e3ff4560a";

var params = "{ keywords: 'it', location: 'Bern'}";

//create xmlHttpRequest object

var http = new XMLHttpRequest();

//open connection. true - asynchronous, false - synchronous

http.open("POST", url + key, true);

//Send the proper header information

http.setRequestHeader("Content-type", "application/json");

//Callback when the state changes

http.onreadystatechange = function () {
  if (http.readyState == 4 && http.status == 200) {
    alert(http.responseText);
  }
};

//Send request to the server

http.send(params);
