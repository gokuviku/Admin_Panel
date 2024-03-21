
//insert
const arr = [];
const addData = () => {
    let allData = JSON.parse(localStorage.getItem("CatInfo"));
    let len = allData != null ? allData.length : 0;
    const name = document.catfrm.catname.value;

    const catData = {
        id: len + 1,
        name: name
    }
    arr.push(catData);
    localStorage.setItem('CatInfo', JSON.stringify(arr));
    document.catfrm.catname.value = "";

    dispData()

}


//diplay
const dispData = () => {
    tr = ''
    let allData = JSON.parse(localStorage.getItem("CatInfo"));
    if (allData != null) {
        allData.map((i) => {
            tr += `<tr> 
        <td>${i.id}</td>
        <td> ${i.name} </td> 
        <td><a href="#" class="btn btn-danger" onclick="delData()">Delete </td> 

        </tr>`;

        })
        document.getElementById("allCatData").innerHTML = tr;
    }
}
dispData()


//delete
const delData = (id) => {
    let allData = JSON.parse(localStorage.getItem("CatInfo"));
    allData.splice(id-1, 1);

    newId = 1 ;
    allData.map((i) => {
        i.id = newId++;
    })
    localStorage.setItem("CatInfo", JSON.stringify(allData))
    dispData();
}
dispData()
