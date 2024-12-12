var productName = document.getElementById("produvtName"),
  productPrice = document.getElementById("produtPrice"),
  productCategory = document.getElementById("produtCatigory"),
  productDesc = document.getElementById("produtDesc"),
  productFile = document.getElementById("produtFile"),
  btnForm = document.getElementById("btn-form"),
  searchInput = document.getElementById("searchInput");

var ProductContainer = [];

if (localStorage.getItem("productData") == null) {
  ProductContainer = [];
} else {
  ProductContainer = JSON.parse(localStorage.getItem("productData"));
}

function AddProduct() {
  if (
    productName.value == "" ||
    productPrice.value == "" ||
    productCategory.value == "" ||
    productDesc.value == ""
  ) {
    alert("!!حط بينات صح ");
    return;
  }

  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDesc.value,
    Image:
      productFile.files.length > 0 ? `Images/${productFile.files[0].name}` : "",
  };

  ProductContainer.push(product);
  localStorage.setItem("productData", JSON.stringify(ProductContainer));
  clearInput();
  DisplayProduct();
}

function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  productFile.value = "";
}

function Update(i) {
  productName.value = ProductContainer[i].name;
  productPrice.value = ProductContainer[i].price;
  productCategory.value = ProductContainer[i].category;
  productDesc.value = ProductContainer[i].description;

  btnForm.innerText = "Update";
  btnForm.onclick = function () {
    ProductContainer[i].name = productName.value;
    ProductContainer[i].price = productPrice.value;
    ProductContainer[i].category = productCategory.value;
    ProductContainer[i].description = productDesc.value;

    if (productFile.files.length > 0) {
      ProductContainer[i].Image = `Images/${productFile.files[0].name}`;
    }

    btnForm.innerText = "Add";
    btnForm.onclick = AddProduct;
    localStorage.setItem("productData", JSON.stringify(ProductContainer));
    clearInput();
    DisplayProduct();
  };
}

function Delete(i) {
  ProductContainer.splice(i, 1);
  localStorage.setItem("productData", JSON.stringify(ProductContainer));
  DisplayProduct();
}

function DisplayProduct() {
  var cartona = "";
  for (let i = 0; i < ProductContainer.length; i++) {
    cartona += `
            <tr>
                <td>${i}</td>
                <td>${ProductContainer[i].name}</td>
                <td>${ProductContainer[i].price}</td>
                <td>${ProductContainer[i].category}</td>
                <td>${ProductContainer[i].description}</td>
                <td><img src="./${ProductContainer[i].Image}" width="50" height="50" alt="${ProductContainer[i].name}"></td>
                <td><button class="btn text-bg-success btn-outline-secondary" onclick="Update(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="btn text-bg-danger btn-outline-danger" onclick="Delete(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
  }

  document.getElementById("product-table").innerHTML = cartona;
}
function SearchProduct(searchProduct) {
  var cartona = ``;
  for (let i = 0; i < ProductContainer.length; i++) {
    if (
      ProductContainer[i].name
        .toLowerCase()
        .includes(searchProduct.toLowerCase()) == true ||
      ProductContainer[i].category
        .toLowerCase()
        .includes(searchProduct.toLowerCase) == true
    ) {
      cartona += `
          <tr>
              <td>${i}</td>
              <td>${ProductContainer[i].name}</td>
              <td>${ProductContainer[i].price}</td>
              <td>${ProductContainer[i].category}</td>
              <td>${ProductContainer[i].description}</td>
              <td><img src="./${ProductContainer[i].Image}" width="50" height="50" alt="${ProductContainer[i].name}"></td>
              <td><button class="btn text-bg-success btn-outline-secondary" onclick="Update(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
              <td><button class="btn text-bg-danger btn-outline-danger" onclick="Delete(${i})"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`;
    }
  }

  document.getElementById("product-table").innerHTML = cartona;
}
DisplayProduct();
