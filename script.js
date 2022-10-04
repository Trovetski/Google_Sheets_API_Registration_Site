const ACCESS_TOKEN = 'ya29.A0ARrdaM-W6MjCJc4rn4EToSBcjsE_0PuGItHoEPS-0unfJ-62imONoecDKD6fQ96k-J8V-BkIeTOBTMpbnib0Ufcv-FzMZav7_qRNn4Lv1nh9ruWI4d39ir7zdhKRIZByX_9WqywCNZPW2L-VTinhoySP-c7F';
const SHEET_ID = '1kJa8i0rUgRBu8y1rp2atu2BF7TKxqce6_OwWrFo1zmI';

const API_KEY = "AIzaSyCEl5_1Tz7Q-86zBC1o0MoeA2Rx269T6gY";
const CLIENT_ID = "811304179009-6grdlacaa4406fr7lvensnvck52d7592.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

var isSignedIn = false;

async function handleSignIn(){
    if(!isSignedIn){
        await init();
        authenticate()
        loadClient()
        upload()
    }else{
        upload()
    }
}

function upload() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;

    if(firstName === ""){
        alert("Invalid First Name");
        return;
    }else if(lastName === ""){
        alert("Invalid Last Name");
        return;
    }

    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": "1kJa8i0rUgRBu8y1rp2atu2BF7TKxqce6_OwWrFo1zmI",
      "range": "A1:B500",
      "valueInputOption": "RAW",
      "resource": {
        "values": [
          [
            firstName,
            lastName
          ]
        ]
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

async function getSheetValues(){

    var input = document.getElementById("firstNameFetch").value
    document.getElementById("firstNameFetch").value = "";


    const request = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1kJa8i0rUgRBu8y1rp2atu2BF7TKxqce6_OwWrFo1zmI/values/A1:B500?key=AIzaSyCEl5_1Tz7Q-86zBC1o0MoeA2Rx269T6gY",
    {
        headers: {
        "Content-Type": "application/json",
        }
    })

    const data = await request.json();
    for(arr in data["values"]){
        if(data["values"][arr][0] === input){
            document.getElementById("lastNameDisplay").innerHTML = data["values"][arr][1];
            return;
        }
    }
    document.getElementById("lastNameDisplay").innerHTML = "Entry Not Found";
    return data;
}

function authenticate() {
    try {
        return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"})
        .then(function() { console.log("Sign-in successful");isSignedIn=true; },
            function(err) { console.error("Error signing in", err)});
    } catch (error) {
        alert("Sign in Error try again")
    }
    
}
function loadClient() {
    try {
        gapi.client.setApiKey("AIzaSyCEl5_1Tz7Q-86zBC1o0MoeA2Rx269T6gY");
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function() { console.log("GAPI client loaded for API"); isSignedIn=true; },
            function(err) { console.error("Error loading GAPI client for API", err); alert("Sign in Error try again")});
    } catch (error) {
        alert("Sign in Error try again")
    }
}
function init(){    
    gapi.load("client:auth2", function() {
        gapi.auth2.init({'scope': SCOPE,client_id: "811304179009-6grdlacaa4406fr7lvensnvck52d7592.apps.googleusercontent.com"});
    });
}