let arr = [];

const insert=()=>{
    let cdata=JSON.parse(localStorage.getItem("catdata"));
    let cname=document.catfrm.catname.value;
    let cid=document.catfrm.catid.value;
    let obj ={};
    if(cid!=''){
        //update    
        cdata.map((item)=>{
            if(item.id == cid)
            item.name=cname;
        })
        localStorage.setItem('catdata', JSON.stringify(cdata));
    }else{
        if(cdata!=null){
            obj={
                id:cdata.length+1,
                name:cname
            }
            arr = cdata
        }
        else{
            //new array push
            obj = {
                id:1,
                name: cname
            }
        }
        arr.push(obj)
        localStorage.setItem("catdata", JSON.stringify(arr))
        
    }
    document.catfrm.catname.value ='';
    document.catfrm.catid.value='';
    display();
}

const display = () => {
    let cData = JSON.parse(localStorage.getItem("catdata"));
    let cluster = ''

    cData.map((item) => {
        cluster += `  <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td><button class="btn btn-primary" onclick="edit(${item.id})">UPDATE</buton></td>
                    <td><button class="btn btn-danger"onclick="remove(${item.id})"> DELETE</buton></td>
                    </tr>`
    })
    document.getElementById('allCatData').innerHTML = cluster
}

const remove = (id) => {
    let catData = JSON.parse(localStorage.getItem("catdata"));
    catData.splice(id - 1, 1);
    let newid = 1;
    catData.map((item) => {
        item.id = newid++
    })
    localStorage.setItem("catdata", JSON.stringify(catData))
    display();
}


const edit = (id) => {
    let catData = JSON.parse(localStorage.getItem("catdata"));
    let data = catData.filter((item) => {
        return item.id == id
    })
    console.log(catData);

    document.catfrm.catname.value = data[0].name
    document.catfrm.catid.value = data[0].id
    id = catfrm.catid.value
}


display();




