


let category = JSON.parse(localStorage.getItem("catData"));
let cluster = `<option>----select category----</option>`
category.map((i) => {
    cluster += `<option value = ${i.id}>${i.name}</option>`
})
document.getElementById("cid").innerHTML = cluster;

let arr2 = [];

const addProd = () => {
    let proData = JSON.parse(localStorage.getItem('products'));
    let name = document.frm.pname.value;
    let catId = document.frm.cid.value;
    let prId = document.frm.pid.value;
    let price = document.frm.price.value;
    let des = document.frm.des.value;
    let prImg = JSON.parse(localStorage.getItem("prImg"));
    let obj = '';

    if (prId != '') {
        //update 
        proData.map((i) => {
            if (i.prId = prId) {
                i.name = name
                i.catId = catId
                i.price = price
                i.des = des
                i.prImg = (prImg != null) ? prImg : i.prImg
            }
        })
        localStorage.setItem("products",JSON.stringify(proData))

    } else {
        if (proData != null) {
            //insert
            obj = {
                prId: proData.length + 1,
                name: name,
                price: price,
                des: des,
                catId: catId,
                prImg: prImg
            };
            arr2 = proData
        } else {
            //new arr push
            obj = {
                prId: 1,
                name: name,
                price: price,
                des: des,
                catId: catId,
                prImg: prImg
            }
        }
        arr2.push(obj)
        localStorage.setItem("products", JSON.stringify(arr2));
    }
    document.frm.pid.value = "";
    document.frm.pname.value = "";
    document.frm.price.value = "";
    document.frm.des.value = "";
    document.frm.cid.value = "";
    document.frm.frmImg.value = "";
    document.getElementById('preview').src = "";
    localStorage.removeItem("prImg");
    display();
}


const display = () => {
    let cluster = '';
    let proData = JSON.parse(localStorage.getItem('products'));
    let cdata = JSON.parse(localStorage.getItem('catData'))
    proData.map((i) => {
        cdata.filter((j) => {
            if (j.id == i.catId)
                return i.cname = j.name;
        })
        cluster += `<tr>
    <td>${i.prId}</td>
    <td>${i.cname}</td>
    <td>${i.name}</td>
    <td>${i.price}</td>
    <td><img src="${i.prImg}" width="50px" height="50px"/></td>
    <td><a href="#" class="btn btn-primary" onclick="edit(${i.prId})">Edit</a></td>
    <td><a href="#" class="btn btn-danger" onclick="del(${i.prId})">Delete</a></td>
    </tr>`
    })
    document.getElementById("allProdData").innerHTML = cluster;
}

const del = (id) => {
    let proData = JSON.parse(localStorage.getItem('products'));
    let nId =1;
    proData.splice(id - 1, 1)
    proData.map((i) => {
        i.id = nId++;
    })
    localStorage.setItem("products",JSON.stringify(proData));
    display();
}
const edit = (id) => {
    let proData = JSON.parse(localStorage.getItem('products'));
    let fill = proData.filter((i) => {
        return i.prId == id;
    })
    document.frm.pname.value = fill[0].name;
    document.frm.cid.value = fill[0].catId;
    document.frm.pid.value = fill[0].prId;
    document.frm.price.value = fill[0].price;
    document.frm.des.value = fill[0].des;
    document.getElementById('preview').src = fill[0].prImg;
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
