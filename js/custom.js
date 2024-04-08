
let catInf = JSON.parse(localStorage.getItem('catData'));
let product = JSON.parse(localStorage.getItem('products'));

let tr = `<button class="stext-106 cl6 hov1 bor3 trans-04  m-r-32 m-tb-5" data-filter="*">
All product
</button>`

catInf.map((i) => {
    tr += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" how-active1 data-filter=".${i.name}">
    ${i.name}
</button>`
})
document.getElementById("CaName").innerHTML = tr

let cluster = ''
catInf.map((i) => {
    product.filter((j) => {
        if (i.id == j.Cid) {
            cluster += `<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${i.name}">
        <!-- Block2 -->
        <div class="block2">
            <div class="block2-pic hov-img0">
                <img src="${j.prImg}" alt="IMG-PRODUCT" height="400px" width="190px">
    
                <a href="#"
                    class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" 
                    onclick="addCart(${j.Cid})">
                    Add to cart
                </a>
            </div>
    
            <div class="block2-txt flex-w flex-t p-t-14">
                <div class="block2-txt-child1 flex-col-l ">
                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        ${j.name}
                    </a>
    
                    <span class="stext-105 cl3">
                        $${j.price}
                    </span>
                </div>
    
                <div class="block2-txt-child2 flex-r p-t-3">
                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                        <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png"
                            alt="ICON">
                        <img class="icon-heart2 dis-block trans-04 ab-t-l"
                            src="images/icons/icon-heart-02.png" alt="ICON">
                    </a>
                </div>
            </div>
        </div>
    </div>`
        }
    })

})


document.getElementById('prInfo').innerHTML = cluster;


let cartData = []
const addCart = (id) => {
    let cData = JSON.parse(localStorage.getItem("cartData"));
    let pname = ""
    let price = ""
    let img = ""
    let obj = {}

    product.filter((i) => {
        if (i.pid == id) {
            pname = i.name;
            price = i.price;
            img = i.prImg;
        }
    })
    if (cData != null) {
        //pid exist or not
        //if exist then qty +=1
        //else push record
        let ans = cData.filter((i) => {
            return i.pid == id
        })
        if (ans.length > 0) {
            //increment  quantity of the item in the cart
            cData.map((i) => {
                if (i.pid == id) {
                    i.qty += 1;
                }
            })

        } else {
            //new arr push

            obj = {
                cartId: cartData.length + 1,
                pid: id,
                img: img,
                pname: pname,
                price: price,
                qty: 1
            }
            cData.push(obj); //it is pushing in object
        }
        localStorage.setItem("cartData", JSON.stringify(cData))
    } else {
        obj = {
            cartId: 1,
            pid: id,
            img: img,
            pname: pname,
            price: price,
            qty: 1
        }
        cartData.push(obj); //it is pushing in array
        localStorage.setItem("cartData", JSON.stringify(cartData))
    }
}
