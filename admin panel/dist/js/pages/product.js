let catList = JSON.parse(localStorage.getItem("catData"));
let cluster = `<option>--select category--</option>`;
catList.map((item) => {
    cluster += `<option value=${item.id}>${item.name}</option>`;
});
document.getElementById("cid").innerHTML = cluster;

let arr2 = [];

const addProd = () => {
    let proData = JSON.parse(localStorage.getItem("products"));
    let name = document.frm.pname.value;
    let price = document.frm.price.value;
    let des = document.frm.des.value;
    let pid = document.frm.pid.value;
    let Cid = document.frm.cid.value;
    let prImg=JSON.parse(localStorage.getItem("prImg"));
    let obj = "";

    if (pid != '') {
        //update
        proData.map((item) => {
            if (item.pid == pid) {
                item.name = name;
                item.price = price;
                item.des = des;
                item.Cid = Cid;
                item.prImg =prImg;
            }
        })
        localStorage.setItem('products', JSON.stringify(proData));

    } else {
        if (proData != null) {
            //insert
            obj = {
                pid: proData.length + 1,
                Cid: Cid,
                name: name,
                price: price,
                des: des,
                prImg:prImg
            };
            arr2 = proData
        } else {
            //new array push
            obj = {
                pid: 1,
                Cid: Cid,
                name: name,
                price: price,
                des: des,
                prImg:prImg
            };
        }
        arr2.push(obj);
        localStorage.setItem('products', JSON.stringify(arr2));
    }
    document.frm.pid.value = "";
    document.frm.pname.value = "";
    document.frm.price.value = "";
    document.frm.des.value = "";
    document.frm.cid.value = "";
    document.frm.frmImg.value = "";
    display();
};
const display = () => {
    let tr = '';
    let proData = JSON.parse(localStorage.getItem("products"));
    let cdata = JSON.parse(localStorage.getItem("catData"));
    proData.map((i) => {
        cdata.filter((j) => {
            if (j.id == i.Cid) {
                return i.cname = j.name;
            }
        })
        tr += `<tr> 
        <td>${i.pid}</td>
        <td>${i.cname}</td> 
        <td>${i.name}</td> 
        <td>${i.price}</td> 
        <td>${i.des}</td> 
        <td><img src="${i.prImg}" width="100px" height="100px"/></td> 
        <td><button class="btn btn-danger" onclick="delProduct(${i.pid})">Delete</button></td>
        <td><button class="btn btn-primary" onclick="editProduct(${i.pid})">Edit</button></td>
        </tr>`;
    });
    document.getElementById("allProdData").innerHTML = tr;
};
const delProduct = (id) => {
    let proData = JSON.parse(localStorage.getItem("products"));
    nid = 1;
    proData.splice(id - 1, 1)
    proData.map((i) => {
        i.pid = nid++;
    })
    localStorage.setItem("products", JSON.stringify(proData))
    display();

}
const editProduct = (id) => {
    let proData = JSON.parse(localStorage.getItem("products"));
    let cat = proData.filter((i) => {
        return i.pid == id
    })
    // console.log(cat);
    document.frm.pid.value = cat[0].pid;
    document.frm.cid.value = cat[0].Cid;
    document.frm.pname.value = cat[0].name;
    document.frm.price.value = cat[0].price;
    document.frm.des.value = cat[0].des;
    document.frm.frmImg.value = cat[0].prImg;

}

const previewImage = (e) => {
    var input = e.target;
    var image = document.getElementById('preview');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
            localStorage.setItem("prImg", JSON.stringify(e.target.result));
        }
        reader.readAsDataURL(input.files[0]);
    }
}
display();
