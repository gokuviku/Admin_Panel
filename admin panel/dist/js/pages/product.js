let catList = JSON.parse(localStorage.getItem("catdata"));
let cluster = `<option>--select category--</option>`;
catList.map((item) => {
    cluster += `<option value=${item.id}>${item.name}</option>`;
});
document.getElementById("cid").innerHTML = cluster;

let arr2 = [];

const addProd = () => {
    let proData = JSON.parse(localStorage.getItem("products"));
    let name = document.prfrm.pname.value;
    let price = document.prfrm.pprice.value;
    let des = document.prfrm.pdes.value;
    let pid = document.prfrm.pid.value;
    let catid = document.prfrm.cid.value;

    if (pid != '') {
        //update
        proData.map((item) => {
            if (item.id == pid) {
                item.name = name;
                item.price = price;
                item.des = des;
                item.catid = catid;

            }
        })
        localStorage.setItem('products', JSON.stringify(proData));

    } else {
        if (proData != null) {
            //insert
            obj = {
                pid: proData.length + 1,
                catid: catid,
                name: name,
                price: price,
                des: des,
            };
            proData.push(obj);
            // arr2 = proData
            localStorage.setItem('products', JSON.stringify(proData));
        } else {
            //new array push
            obj = {
                pid: 1,
                catid: catid,
                name: name,
                price: price,
                des: des,
            };
        }
            arr2.push(obj);
            localStorage.setItem('products', JSON.stringify(arr2));
    }
    document.prfrm.reset();
    dispProd();
};
const dispProd = () => {
    let tr = '';
    let proData = JSON.parse(localStorage.getItem("products"));
    let cdata = JSON.parse(localStorage.getItem("catdata"));


    proData.map((i) => {
        cdata.filter((j) => {
            if (i.catid ==j.id) {
                return i.name = j.name;
            }
        })
        tr += `<tr> 
        <td>${i.pid}</td>
        <td>${i.name}</td> 
        <td>${i.price}</td> 
        <td>${i.des}</td> 
        <td><button class="btn btn-danger" onclick="delProduct(${i.pid})">Delete</button></td>
        <td><button class="btn btn-primary" onclick="editProduct(${i.pid})">Edit</button></td>
        </tr>`;
    });
    document.getElementById("allProdData").innerHTML = tr;
};

const editProduct = (id) => {
    let proData = JSON.parse(localStorage.getItem("products"));
    proData.filter((i) => {
        if (i.pid == id)
        //get value in input field
            document.prfrm.pid.value = i.pid;
            document.prfrm.pname.value = i.name;
            document.prfrm.pprice.value = i.price;
            document.prfrm.pdes.value = i.des;
            document.prfrm.cid.value = i.catid;
    })
}

const delProduct = (id) => {
    let proData = JSON.parse(localStorage.getItem("products"));
    newid = 1;
    proData.splice(id - 1, 1)
    proData.map((i) => {
        i.pid = newid++;
    })
    localStorage.setItem("products", JSON.stringify(proData))
    dispProd();

}
dispProd();
addProd();
