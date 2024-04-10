//display cart

let displayCart = () => {
    let cData = JSON.parse(localStorage.getItem("cartData"));

    let loop = ''
    cData.map((i) => {
        loop += `<tr>
                    <td class="column-1">
                        <div class="how-itemcart1">
                            <img src="${i.img}" alt="IMG">
                        </div>
                    </td>
                    <td class="column-2">${i.pname}</td>
                    <td class="column-3">$ ${i.price}</td>
                    <td class="column-4">
                        <div class="wrap-num-product flex-w m-l-auto m-r-0 d-flex justify-content-center">                     
                            <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product1" value=${i.qty}>
                        </div>
                    </td>
                    <td class="column-5">$ ${i.price * i.qty}</td>
                </tr>`
    })
    document.getElementById("Dis").innerHTML = loop;
}
displayCart();