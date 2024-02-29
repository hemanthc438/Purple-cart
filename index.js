import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings={
    databaseURL : "https://cartitems-one-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const itemsInCart=ref(database,"cartitems")

const itemName = document.getElementById("input-field")
const cartButton = document.getElementById("add-button")
const listItems = document.getElementById("list-data")

cartButton.addEventListener("click", function() {
    let inputValue = itemName.value
    if(inputValue!=""){
    push(itemsInCart,inputValue)}
    else{
        alert("Please enter any item...")
    }
    clearField();
    //addDataToElement(inputValue)
})

onValue(itemsInCart,function(snapshot){
    if(snapshot.exists()){
    var items=Object.entries(snapshot.val())
    clearElement()
    for (var i in items){
        var currentItem = items[i]
        var currentItemKey = currentItem[0]
        var currentItemValue = currentItem[1]

        addDataToElement(currentItem)
    }}
    else{
        listItems.innerHTML="No items here"
    }
})

function clearElement(){
    listItems.innerHTML=""
}
function clearField(){
    itemName.value=""
}
function addDataToElement(item){
    if(item != ""){
        let itemKey = item[0]
        let itemValue = item[1]
        let newEl = document.createElement("li")
        newEl.textContent=itemValue
        listItems.append(newEl)
        newEl.addEventListener("dblclick", function(){
            let deleteItemKey = ref(database,`cartitems/${itemKey}`)
            remove(deleteItemKey)
        })
    }
}
