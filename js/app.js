const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image; //changed images to image
     //by destructuring product object
     const {rate,count}= product.rating
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4 class="text-primary">Price: <span class="text-danger">$${product.price}</span></h4>
      <h5 class="text-primary">Total-Rating: <span class="text-danger">${count}</span></h5>
      <h6 class="text-primary">Average-rating: <span class="text-danger">${rate}</span></h6>
      <div id="cardFooter">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails(${product.id})">Details</button> </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

//load Details
const loadDetails = (id)=>{
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data));
}
//Show details
const showDetails = (data)=>{
  document.getElementById("modalBody").innerHTML = `
    <p><span class="text-primary">Price:</span>$${data.price}</p>
    <p><span class="text-primary">Description:</span> ${data.description}</p>
  `;
}
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal(); //called the function for grand total
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element); //changed parseInt to parseFloat
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2); //changed math.round to toFixed()
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2); //changed math.round to toFixed()
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
