var meals;
var mealsSha = ""; //the file sha code needed to update the file in Github
const accessToken = "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";//enter access code here

//function to upload JSON parsed from textarea
async function upload() {
    var url = "https://api.github.com/repos/ccci-code/summerproject/contents/meals.json";
    let mealText = document.getElementById("meals").value.trim();
    const json = JSON.stringify(JSON.parse(mealText));
    const message = { "message": "my commit message", "committer": { "name": "ccci-code", "email": "monitor@ccc-i.com" }, "sha": mealsSha, "content": btoa(json) };
    const options = {
        method: 'PUT',
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    // send POST request
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.reload();
        }
        );
}

async function init() {
    var r = Math.random();//avoid loading from browser cache
    const url = "https://api.github.com/repos/ccci-code/summerproject/contents/meals.json?" + r;
    const response = await fetch(url);
    try {
        var mealsJson = await response.json();
        mealsSha = mealsJson.sha;
        //load each with results in JSON
        meals = JSON.parse(atob(mealsJson.content)).meals;
    } catch (e) { console.log(e); }
}
function clearMenu() {
    var mealcalendar = document.getElementById("mealcalendar");
    mealcalendar.innerHTML = "";
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//use random numbers to select a main,side, and vegetable from the "meals" JSON object loaded in init()
function createMenu() {
    var numberOfMeals = document.getElementById("nummeals").value;
    var mealcalendar = document.getElementById("mealcalendar");
    mealcalendar.innerHTML = "";
    //write this code
    //loop through the number of requested meals
    //fill each select with the items from the meals
    //use a random number to select which item to select
    //you will need to understand how the HTML select element works
    //See https://www.w3schools.com/tags/tag_select.asp
    /*
        <select>
            <option value="pizza" selected>pizza</option>
            <option value="hamburger" >hamburger</option>
            <option value="pasta" >pasta</option>
        </select>
    */
    
    for (var i = 0; i < numberOfMeals; i++) {
        var meal = "<div class='cell'>";
        var r = randomIntFromInterval(1, meals.main.length);
        var main="";
        //write a loop through meals.main, populate the select element, and select the random item as the selected item


        meal += "<label>" +
            "Main dish" +
            "<select>"+main+"</select>" +
            "</label><br>";
        r = randomIntFromInterval(1, meals.sides.length);
        var sides="";
        //write a loop through meals.sides, populate the select element, and select the random item as the selected item        
        meal +=
            "<label>" +
            "Side dish" +
            "<select>"+sides+"</select>" +
            "</label><br>";
        r = randomIntFromInterval(1, meals.vegetable.length);
        var vegetable="";
        //write a loop through meals.vegetable, populate the select element, and select the random item as the selected item        
        meal +=
            "<label>" +
            "Vegetable" +
            "<select>"+vegetable+"</select>" +
            "</label></div>";
        mealcalendar.innerHTML += meal;
    }
}

