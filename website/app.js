//client side
/* Global Variables */
const baseUrl = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'ab1c20bb9bc809aa640a6331291db10b&units=metric';
//api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',performAction);
function performAction(e){
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const countrycode = document.getElementById('country').value;;
    const fullURL = 'https://'+baseUrl+zipcode+','+countrycode+'&appid='+apiKey;

    retrieveData(fullURL)
        .then((newData) => postData("/add", {date:newDate,temp:newData.main.temp,feelings:feelings}))
        .then(()=> updateUI())
        .catch(error => console.log(error.message));
};

//Async POST
const postData = async ( url ='', data = {}) => {
    console.log(data);
    try {
        const response = await fetch (url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        return response;
    }catch(error) {
        console.log("error", error.message);
        return error;
    };
};

// Async GET
const retrieveData = async (url) =>{
    const res = await fetch (url);
    try {
        // send GET request and transform into JSON
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error.message);
    }
};


// finally, display the changes to UI
const updateUI = async() =>{
    try{
        const req = await fetch('/all');
        const allData = await req.json();
        console.log(allData);
        // docyment.getElementById('entryHolder').innerHTML = allData[0].entryHolder;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch(error){
        console.log('error:',error.message);
    };
}