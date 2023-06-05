var productNameInput=document.getElementById('productNameInput');
var productPriceInput=document.getElementById('productPriceInput');
var productCategoryInput=document.getElementById('productCategoryInput');
var productDescInput=document.getElementById('productDescInput');
var productList=[];
var currentIndex=0;
// validation 
var invalidName=document.getElementById('invalidName');
var emptyName=document.getElementById('emptyName');

var invalidPrice=document.getElementById('invalidPrice');
var emptyPrice=document.getElementById('emptyPrice');

var invalidCategory=document.getElementById('invalidCategory');
var emptyCategory=document.getElementById('emptyCategory');

// local Storage 
if(localStorage.getItem('myProduct') != null)
{
    productList= JSON.parse(localStorage.getItem('myProduct'));
    display();
}
else{
    currentIndex=[];
}
// ADD
function addProduct() {
    var products = {};
    products["productName"] = productNameInput.value;
    products["productPrice"] = productPriceInput.value;
    products["productCategory"] = productCategoryInput.value;
    products["productDesc"] =  productDescInput.value;

    if(validateProductName() && validateProductPrice() && validateProductCategory()){
        productList.push(products);  
        localStorage.setItem('myProduct',JSON.stringify(productList));
        display();
        clearForm();
    }
    else{
        validateProductName();
        validateProductPrice();
        validateProductCategory();
    }
}
// clear
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}
// display
function display(){
    var data=``;
    for(var i=0 ; i < productList.length ;i++){
       data+=` 
       <tr>
       <td>${i+1}</td>
       <td>${productList[i].productName}</td> 
       <td>${productList[i].productPrice}</td>
       <td>${productList[i].productCategory}</td>
       <td>${productList[i].productDesc}</td>
       <td><button class="btn btn-outline-warning" id="update"onclick=updateProduct(${i});>Update</button></td>
       <td><button class="btn btn-outline-danger" onclick=deleteProduct(${i});>Delete</button></td>
       </tr>`;
    }
    document.getElementById("tableBody").innerHTML=data;
}
// delete
function deleteProduct(indexRemoveRow){
    productList.splice(indexRemoveRow,1);
    localStorage.setItem('myProduct',JSON.stringify(productList));
    display();
}
// update
function updateProduct(index){
    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "inline-block";
    productNameInput.value =productList[index].productName ;
    productPriceInput.value =productList[index].productPrice;
    productCategoryInput.value = productList[index].productCategory;
    productDescInput.value = productList[index].productDesc;
    currentIndex=index;
}
function updatePro(){
    if(validateProductName() && validateProductPrice() && validateProductCategory()){
    productList[currentIndex].productName = productNameInput.value;
    productList[currentIndex].productPrice  = productPriceInput.value;
    productList[currentIndex].productCategory  = productCategoryInput.value;
    productList[currentIndex].productDesc =  productDescInput.value;
    localStorage.setItem('myProduct',JSON.stringify(productList));
    display();
    clearForm();
    CloseInput();
   }
   else{  
    validateProductName();
    validateProductPrice();
    validateProductCategory();
  }
}
function CloseInput() {
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("addBtn").style.display = "inline-block";
}
function validateProductName()
{
    var letters = /^[A-Za-z]+$/;
    if (letters.test(productNameInput.value))
    {
        invalidName.classList.replace("d-block", "d-none");
        emptyName.classList.replace("d-block", "d-none");
        return true;
    }
    else if(productNameInput.value == ''){
        invalidName.classList.replace("d-block", "d-none");
        emptyName.classList.replace("d-none", "d-block");
        productNameInput.focus(); 
        return false;
    }
    else{
        invalidName.classList.replace("d-none", "d-block");
        emptyName.classList.replace("d-block", "d-none");
        productNameInput.focus(); 
        return false;
    }
}

function validateProductPrice()
{
    var PriceNumber=/^([2-9][0-9][0-9])$|^([1][0-9][0-9][0-9])$/;
    if (PriceNumber.test(productPriceInput.value))
    {
        invalidPrice.classList.replace("d-block", "d-none");
        emptyPrice.classList.replace("d-block", "d-none");
        return true;
    }
    else if(productPriceInput.value == ''){
        invalidPrice.classList.replace("d-block", "d-none");
        emptyPrice.classList.replace("d-none", "d-block");
        return false;
    }
    else{
        invalidPrice.classList.replace("d-none", "d-block");
        emptyPrice.classList.replace("d-block", "d-none");
        return false;
    }
}

function validateProductCategory()
{
    var letters = /^[A-Za-z]+$/;
    if (letters.test(productCategoryInput.value))
    {
        invalidCategory.classList.replace("d-block", "d-none");
        emptyCategory.classList.replace("d-block", "d-none");
        return true;
    }
    else if(productCategoryInput.value == ''){
        invalidCategory.classList.replace("d-block", "d-none");
        emptyCategory.classList.replace("d-none", "d-block");
        return false;
    }
    else{
        invalidCategory.classList.replace("d-none", "d-block");
        emptyCategory.classList.replace("d-block", "d-none");
        return false;
    }
}

