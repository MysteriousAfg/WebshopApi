"use strict"

const proEl = document.getElementById("pro");
const buyEl = document.getElementById("buy");
const sendEl = document.getElementById("send");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const adressEl = document.getElementById("adress");
const shippingEl = document.getElementById("shipping");
const formEl = document.getElementById("form");


/* Get all products */
fetch("https://fakestoreapi.com/products") 
.then(res => res.json())
.then(data => Data(data));

function Data(data) {
   /* Create variable */ 
    let webbshopArray = data;
   
    /* Foreeach loop/Iteration */
     for (let products of webbshopArray) {
        
        proEl.innerHTML += `
        <article class = "items">
            <h2 class = "title">${products.title}</h2>
            <br>
            <p>${products.id}</p>
            <br>
            <p> Description: ${products.description}</p>
            <br>
            <p class = "price"> Price: ${products.price}</p>
            <br>
            <p class="rate"> Rating: ${JSON.stringify(products.rating)}</p>
            <br>
            <img src = '${products.image}' alt= '' width = "150" class="image">
            <button class ="btn btn-success" onClick ="window.location.href ='form.html'; saveData(${products.id}, ${products.price})" >Buy product </button>
            <hr>
        </article>
        <br>
        `
        console.log(products); 

    } 
    
}

/* LocalStorage */
function saveData (id,price){
    let obj = {
        id: id,
        price: price
    };
    
    let myObj = JSON.stringify(obj);
    localStorage.setItem("cart", myObj);
}

/* Sends info to firebase */
function postOrder(){
    console.log("körs");

    let username = usernameEl.value;
    let email = emailEl.value;
    let adress = adressEl.value;
    let shipping = shippingEl.value;

   /* Get local storage info */
    let json = localStorage.getItem("cart");
    let object = JSON.parse(json);

    let id = object.id;
   

    /* Give error if form not correctly filled */
    let body = JSON.stringify({
        "fields":{
            "id": {
                "integerValue": id,
            },
            "username": {
                "stringValue": username,
            },
            "email": {
                "stringValue": email,
            },
            "adress": {
                "stringValue": adress,
            },
            "shipping": {
                "stringValue": shipping
            }
        }
    }) 
 
    fetch("https://firestore.googleapis.com/v1/projects/afgmy-6d948/databases/(default)/documents/Users", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:body
    })
    .then(res => res.json())
    .then(data => getOrders(data));
    alert("Sent");
}