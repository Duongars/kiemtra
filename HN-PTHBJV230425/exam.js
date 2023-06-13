let action = "creat";
// mảng 2 chiều chứa các thông tin học viên
let listProduct = [["P001", "áo sơ mi", "5000", "8000", "13/06/2003", "x,xl", "male", "do sếp tổng nhập"],
["P002", "áo hai dây", "3000", "4000", "12/06/2023", "x,xl,l", "female", "do nhân viên kho nhập"]
];

let render = "render";
// hàm render dữ liệu từ mảng liststudent ra table
function renderData() {
    // lấy ra phần tử html được render dữ liệu
    if (render == "render") {

        let tbody = document.getElementById("productList");
        // dat tbody chưa chứa giá trị nào
        tbody.innerHTML = "";
        for (let index = 0; index < listProduct.length; index++) {
            // render du lieu từng tbody
            tbody.innerHTML += `<tr id="edit${index}">
                            <td>${index + 1}</td>
                            <td>${listProduct[index][0]}</td>
                            <td>${listProduct[index][1]}</td>
                            <td>${listProduct[index][2]}</td>
                            <td>${listProduct[index][3]}</td>
                            <td>${listProduct[index][4]}</td>
                            <td>${listProduct[index][5]}</td>
                            <td>${listProduct[index][6]}</td>
                            <td>${listProduct[index][7]}</td>
                            <td>
                            <button id="edit${index}" onclick="edit('${listProduct[index][0]}')">edit</button>
                            <button id="delete${index}" onclick="deleteStudent('${listProduct[index][0]}')">delete</button>
                            </td>
                        </tr>`
        }
    } else {
        // lấy giá trị của ô tìm kiếm
        let searchProductName = document.getElementById("product_info").value;
        //    tìm giá trị trong productList
        let index = getProductNameIndex(searchProductName);
        if (index >= 0) {

            let searchArray = [];
            searchArray.push(listProduct[index][0], listProduct[index][1], listProduct[index][2], listProduct[index][3], listProduct[index][4], listProduct[index][5], listProduct[index][6], listProduct[index][7]);
            let tbody = document.getElementById("productList");
            // dat tbody chưa chứa giá trị nào
            tbody.innerHTML = "";

            // render du lieu từng tbody
            tbody.innerHTML += `<tr id="edit${index}">
                                <td>${index + 1}</td>
                                <td>${listProduct[index][0]}</td>
                                <td>${listProduct[index][1]}</td>
                                <td>${listProduct[index][2]}</td>
                                <td>${listProduct[index][3]}</td>
                                <td>${listProduct[index][4]}</td>
                                <td>${listProduct[index][5]}</td>
                                <td>${listProduct[index][6]}</td>
                                <td>${listProduct[index][7]}</td>
                                <td>
                                <button id="edit${index}" onclick="edit('${listProduct[index][0]}')">edit</button>
                                <button id="delete${index}" onclick="deleteStudent('${listProduct[index][0]}')">delete</button>
                                </td>
                            </tr>`


            render = "render";
        } else {
            alert("giá trị tìm kiếm không tồn tại");
        }
    }

}
function validateForm() {
    //  lấy dữ liêu tu form
    let productId = document.getElementById("product_id").value;
    let productName = document.getElementById("product_name").value;
    let importPrice = document.getElementById("import_price").value;
    let exportPrice = document.getElementById("export_price").value;
    let importDate = document.getElementById("import_date").value;

    let size = document.querySelectorAll("input[class='size']:checked").value;
    let gender = document.querySelector("input[name='gender']:checked").value;
    let description = document.getElementById("description").value;
    debugger

    var curDate = new Date();

    let Datecheck = new Date(importDate);
    if (productId == "" || productName == "" || importPrice == "" || importDate == "" || exportPrice == "" || size == "" || gender == "" || description == "") {
        alert("Xin vui lòng nhập dữ liệu đầy đủ");
        return false;
    }

    if (!productId.startsWith("P"|| productId.length != 4)) {
        alert("vui lòng nhập dữ liệu đúng định dạng Product ID")
        return false
    }

    if (productName.length < 6 || productName.length > 50) {
        alert("vui lòng nhập dữ liệu đúng định dạng cho Product Name")
        return false;

    }
    if (getProductIdIndex(productId)>=0) {
        alert(" giá trị Product Id đã tồn tại")
        return false;
    }

    if (getProductNameIndex(productName) >= 0) {
        alert(" giá trị Product Name đã tồn tại")
        return false;
    }


    if (Number(importPrice) < 0) {
        alert("vui lòng nhập dữ liệu đúng định dạng cho Import price");
        return false;
    }

    if (Number(importPrice) > Number(exportPrice)) {
        alert("vui lòng nhập dữ liệu đúng định dạng cho Export price");
        return false;
    }

    if (curDate < Datecheck) {
        alert("vui lòng nhập Import date đúng quy định");
        return false;
    }
    return true

}


function creatOredit() {

    let productId = document.getElementById("product_id").value;
    let productName = document.getElementById("product_name").value;
    let importPrice = document.getElementById("import_price").value;
    let exportPrice = document.getElementById("export_price").value;
    let importDate = dateTransforms(document.getElementById("import_date").value);
    let size = document.querySelectorAll("input[type=checkbox]:checked");
    let gender = document.querySelector("input[name='gender']:checked").value;
    let description = document.getElementById("description").value;

    // duyệt và lấy các kết quả của input Size in ra mang sizeResult
    let sizeResult = []
    size.forEach ( function (element) {
           sizeResult.push(element.value);
            })
    

    if (validateForm()) {
        if (action == "creat") {
            let product = [];
            product.push(productId, productName, importPrice, exportPrice, importDate, sizeResult, gender, description);
            listProduct.push(product);


        } else {

            let index = getProductIdIndex(productId);
            listProduct[index][1] = productName;
            listProduct[index][2] = importPrice;
            listProduct[index][3] = exportPrice;
            listProduct[index][4] = importDate;
            listProduct[index][5] = sizeResult;
            listProduct[index][6] = description;



        }
        document.getElementById("product_id").value = "";
        document.getElementById("product_name").value = "";
        document.getElementById("import_price").value = "";
        document.getElementById("export_price").value = "";
        document.getElementById("import_date").value = "";

        renderData();
        document.getElementById("product_id").readOnly = false;
        action = "creat";
    }
}
function getProductIdIndex(productId) {

    for (let index = 0; index < listProduct.length; index++) {
        if (listProduct[index][0] == productId) {
            return index;
        }
    }
    return -1;

}
function getProductNameIndex(productName) {
    for (let index = 0; index < listProduct.length; index++) {
        if (listProduct[index][1] == productName) {
            return index;
        }
    }
    return -1;
}



let saveBtn = document.getElementById("btnSubmit");
saveBtn.addEventListener("click", function (event) {
    event.preventDefault();

    creatOredit()
})

let searchBtn = document.getElementById("search_btn");
searchBtn.addEventListener("click", function () {

    // debugger
    render = "search";
    renderData();

})
let returnList = document.getElementById("returnList")
returnList.addEventListener("click",function () {
    renderData();
})

function edit(productId) {
    action = "edit"
    let index = getProductIdIndex(productId);

    document.getElementById("product_id").value = listProduct[index][0];
    document.getElementById("product_name").value = listProduct[index][1];
    document.getElementById("import_price").value = listProduct[index][2];
    document.getElementById("export_price").value = listProduct[index][3];
    document.getElementById("import_date").value = listProduct[index][4];
    document.getElementById("description").value = listProduct[index][7];

    if (listProduct[index][6] == "male") {
        document.getElementById("male").checked = true;
    } else {
        document.getElementById("female").checked = true
    }
    document.getElementById("product_id").readOnly = true;
    action = "edit";

}

function deleteStudent(productId) {
    let index = getProductIdIndex(productId);
    listProduct.splice(index, 1);
    renderData();

}

// hàm chuyển định dạng ngày tháng
function dateTransforms(date) {
    let Datecheck = new Date(date);
    let importDay = Datecheck.getDate();
    let importMonth = Datecheck.getMonth() + 1;
    let importYear = Datecheck.getFullYear();
    let dateTransformed = importDay + "/" + importMonth + "/" + importYear;
    return dateTransformed;
}

let sizeList = document.querySelectorAll("input[name=size]:checked");
console.log(sizeList);

document.onload = renderData();
