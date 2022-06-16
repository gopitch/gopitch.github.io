function submitForm(email, callback){
  // Create the new request
  var email = document.querySelector('#email').value;
  if (!email || !email.length || !email.indexOf('@')) {
    return;
  }
  var hutk = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  var submitButton = document.querySelector('#submit');
  submitButton.innerHTML = 'Please wait';
  var xhr = new XMLHttpRequest();
  var portalId = '22166641';
  var formId = '036e5310-fc85-4abc-b5d1-5fa190b1472b'
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + formId;
  var data = {
    "submittedAt": (new Date()).getTime().toString(),
    "fields": [
      {
        "objectTypeId": "0-1",
        "name": "email",
        "value": email
      }
    ],
    "context": {
      "hutk": hutk, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      "pageUri": document.location.href,
      "pageName": document.title,
    }
  }

  var final_data = JSON.stringify(data)

  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
      submitButton.innerHTML = 'Thank you!';

    } else {
      submitButton.innerHTML = 'Oops!';
    }
  }
  // Sends the request

  xhr.send(final_data);

}
