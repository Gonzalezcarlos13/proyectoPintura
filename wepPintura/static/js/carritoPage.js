window.onload = function() {
    document.getElementById("d-flex-carrito").style.display = "none";
    listarCarritoPage();
}

function listarCarritoPage() {
    let listaCarrito = document.getElementById("divRowCarrito");
    let divCantidadCarrito = document.getElementById("cantidad_carrito2");
    let divDescuento = document.getElementById("porcentaje_descuento2");
    let divTotal = document.getElementById("precio_total2");
    let divPrecioConIva = document.getElementById("precio_coniva2");
    let divPrecioBruto = document.getElementById("precio_bruto2");
    let btnComprar = document.getElementById("btnComprar");
    let precio_bruto = 0;
    let precio_coniva = 0;
    let descuento = 50;
    let totalFinal = 0;
    let cantidadTotal = 0;
    fetch("/listar_carrito")
    .then(response => response.json())
    .then(data => {
        let carritoData = data.carrito;
        listaCarrito.innerHTML = `
        <div class="col-12">
            <h1 class="h1-fondo">Carrito de compras</h1>
        </div>
        `;
        for (let key in carritoData) {
            let item = carritoData[key];
            let idPintura = item.idPintura;
            let nombre = item.nombre;
            let total = item.total;
            let cantidad = item.cantidad;

            totalFinal += total;
            cantidadTotal += cantidad;

            let nuevoDiv = document.createElement("div");
            nuevoDiv.id = "item_carrito" + idPintura;

            nuevoDiv.innerHTML = `
                <div class="col-12">
                    <div class="card p-2">
                        <div class="table-responsive p-2">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="width:5%; font-size: 26px"><strong>#${idPintura}</strong></td>
                                        <td style="width:25%"><img src="${item.foto}" alt="Card image" style="object-fit: cover; width: 100%;"></td>
                                        <td style="width:30%">${nombre}</td>
                                        <td style="width:12%"><button class="btnMasMenos" onclick="quitarCarrito('${item.idPintura}','2')">-</button><input type="text" value="${cantidad}" id="stepperInput{{item.idPintura}}" style="width:40px; text-align: center" readonly><button class="btnMasMenos" onclick="agregarCarrito('${item.idPintura}','2')">+</button></td>
                                        <td style="width:18%">${total.toLocaleString()}</td>
                                        <td style="width:10%">
                                            <div class="form-group">
                                                <img src="http://127.0.0.1:8000/static/img/papelera roja.png" alt="" style="cursor:pointer;" onclick="eliminarCarrito('${item.idPintura}','1')">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            listaCarrito.appendChild(nuevoDiv);
        }
        if (parseInt(cantidadTotal) > 0) {
            btnComprar.disabled = false;
        } else {
            btnComprar.disabled = true;
            listaCarrito.innerHTML = `
                <div class="col-12">
                    <h1 class="h1-fondo">Carrito de compras</h1>
                </div>
                <div class="col-12" style="font-size: 60px; font-weight: bolder; text-align: center; margin-top: 60px; margin-bottom: 60px">
                    No hay productos en el carrito
                </div>
            `;
        }
        precio_bruto = (parseInt(totalFinal) - ((parseInt(totalFinal) * 19)/100)).toString();
        precio_coniva = totalFinal;
        totalFinal = (parseInt(totalFinal) - ((parseInt(totalFinal) * parseInt(descuento))/100)).toString();
        divCantidadCarrito.textContent = ": " + parseInt(cantidadTotal).toLocaleString();
        divPrecioBruto.textContent = ": $" + parseInt(precio_bruto).toLocaleString();
        divPrecioConIva.textContent = ": $" + parseInt(precio_coniva).toLocaleString();
        divDescuento.textContent = ": " + descuento + "%";
        divTotal.textContent = ": $" + parseInt(totalFinal).toLocaleString();
    })
    .catch(error => {
        console.error("Error al listar carrito:", error);
    });
}