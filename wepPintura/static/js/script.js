window.onload = function() {
  listarCarrito();
  formatearValor();
}


function formatearValor() {
  let a_precio = document.getElementsByClassName("a-precio");

  for (let i = 0; i < a_precio.length; i++) {
    let precio = parseInt(a_precio[i].textContent.replace('$','')).toLocaleString();
    a_precio[i].textContent = "$" + precio;
  }
}

function actualizarCantidadCarrito() {
  let tablaCarrito = document.getElementById("tabla-carrito");
  let listaCarrito = document.getElementById("tbody-carrito");
  let detalleCarrito = document.getElementById("detalle-carrito");
  let btnLimpiar = document.getElementById("btnLimpiar");
  fetch("/obtener_cantidad_carrito")
  .then(response => response.json())
  .then(data => {
    let cantidadCarrito = document.getElementById("numero-carro");
    let cantidad = data.cantidad;
    cantidadCarrito.textContent = cantidad;
    if(cantidad < 1) {
      btnLimpiar.style.display = "none";
      tablaCarrito.style.marginTop = "30%";
      detalleCarrito.style.marginTop = "30%";
      listaCarrito.style.fontSize = "25px";
      listaCarrito.style.fontWeight = "bolder";
      listaCarrito.style.textAlign = "center";
      listaCarrito.textContent = "No hay productos en el carrito";
    } else {
      btnLimpiar.style.display = "block";
      tablaCarrito.style.marginTop = "0";
      detalleCarrito.style.marginTop = "0";
      listaCarrito.style.fontSize = "15px";
      listaCarrito.style.fontWeight = "";
      listaCarrito.style.textAlign = "";
    }
  })
  .catch(error => {
    console.error("Error al obtener la cantidad del carrito:", error);
  });
}

function agregarCarrito(id, tipoAgregar) {
  fetch("/agregar_carrito/"+id)
  .then(response => response.json())
  .then(data => {
    listarCarrito();
    if( tipoAgregar == "0") {
      Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: 'Se agrego producto a carrito!'
      })
    } else if( tipoAgregar == "2") {
      listarCarritoPage();
    }
  })
  .catch(error => {
    console.error("Error al obtener la cantidad del carrito:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Error al obtener la cantidad del carrito: ' + error
    })
  });
}

function quitarCarrito(id, tipoAgregar) {
  fetch("/quitar_carrito/"+id)
  .then(response => response.json())
  .then(data => {
    listarCarrito();
    if( tipoAgregar == "0") {
      Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: 'Se quitó producto del carrito!'
      })
    } else if( tipoAgregar == "2") {
      listarCarritoPage();
    }
  })
  .catch(error => {
    console.error("Error al quitar producto a carrito: ", error);
    alert("Error al quitar producto a carrito: " + error);
  });
}

function eliminarCarrito(id, tipoEliminar) {
  fetch("/eliminar_carrito/"+id)
  .then(response => response.json())
  .then(data => {
    listarCarrito();
    if( tipoEliminar == "0") {

    } else if( tipoEliminar == "1") {
      listarCarritoPage();
    }
  })
  .catch(error => {
    console.error("Error al eliminar producto a carrito: ", error);
    alert("Error al quitar producto a carrito: " + error);
  });
}

function limpiarCarrito() {
  fetch("/limpiar_carrito")
  .then(response => response.json())
  .then(data => {
    listarCarrito();
    btnLimpiar.style.display = "none";
    Swal.fire({
      icon: 'success',
      title: 'Bien!',
      text: 'Se ha limpiado todo el carrito!'
    })
  })
  .catch(error => {
    console.error("Error al limpiar el carrito: ", error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Error al limpiar el carrito: ' + error
    })
  });
}

function listarCarrito() {
  let listaCarrito = document.getElementById("tbody-carrito");
  let divDescuento = document.getElementById("porcentaje_descuento");
  let divTotal = document.getElementById("precio_total");
  let divPrecioConIva = document.getElementById("precio_coniva");
  let divPrecioBruto = document.getElementById("precio_bruto");
  let precio_bruto = 0;
  let precio_coniva = 0;
  let descuento = 50;
  let totalFinal = 0;
  fetch("/listar_carrito")
  .then(response => response.json())
  .then(data => {
    let carritoData = data.carrito;
    listaCarrito.innerHTML = "";
    for (let key in carritoData) {
      let item = carritoData[key];
      let idPintura = item.idPintura;
      let nombre = item.nombre;
      let total = item.total;
      let cantidad = item.cantidad;

      totalFinal += total;

      let nuevoTr = document.createElement("tr");
      nuevoTr.id = "item_carrito" + idPintura;

      nuevoTr.innerHTML = `
        <td style="width: 29%">
          <div style="height: 100%;">
              <img src="${item.foto}" alt="Card image" style="width: 100%;">
          </div>
        </td>
        <td style="width: 40%;">
          <table class="table_carrito_collapse_2">
              <tr>
                  <td>${nombre}</td>
              </tr>
              <tr>
                  <td class="item_carrito">$${total.toLocaleString()}</td>
              </tr>
          </table>
        </td>
        <td style="width:30%"><button class="btnMasMenos" onclick="quitarCarrito('${item.idPintura}','1')">-</button><input type="text" value="${cantidad}" id="stepperInput{{item.idPintura}}" style="width:30px; text-align: center" readonly><button class="btnMasMenos" onclick="agregarCarrito('${item.idPintura}','1')">+</button></td>
        <td style="width: 1%;">
          <img src="http://127.0.0.1:8000/static/img/papelera roja.png" alt="" style="cursor:pointer;" onclick="eliminarCarrito('${item.idPintura}','0')">
        </td>
      `;

      // Agregar el nuevo elemento <tr> a la tabla
      listaCarrito.appendChild(nuevoTr);
    }
    precio_bruto = (parseInt(totalFinal) - ((parseInt(totalFinal) * 19)/100)).toString();
    precio_coniva = totalFinal;
    totalFinal = (parseInt(totalFinal) - ((parseInt(totalFinal) * parseInt(descuento))/100)).toString();
    divPrecioBruto.textContent = ": $" + parseInt(precio_bruto).toLocaleString();
    divPrecioConIva.textContent = ": $" + parseInt(precio_coniva).toLocaleString();
    divDescuento.textContent = ": " + descuento + "%";
    divTotal.textContent = ": $" + parseInt(totalFinal).toLocaleString();
    actualizarCantidadCarrito();
  })
  .catch(error => {
    console.error("Error al listar carrito:", error);
  });
}



function AbrirCortina() {
  $("#cortina").addClass("cortina-abierta")
}

function CerrarCortina() {
  $("#cortina").removeClass("cortina-abierta")
}

function eliminarPintura(url) {
  Swal.fire({
    title: 'Esta seguro de eliminar',
    text: "No se podra revertir esta accion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Se ha eliminado',
        text: "Se elimino satisfactoriamente!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = url;
        }
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'cancelado',
        'ufff por poco :)',
        'error'
      )
    }
  })
}


function modificarPintura(idPintura) {
  Swal.fire({
    title: 'Desea Modificar?',
    text: "No se podra revertir esta accion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, modificalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      const formulario = document.getElementById('form_modificar' + idPintura);

      fetch(formulario.action, {
        method: formulario.method,
        body: new FormData(formulario)
      }).then(response => {
        Swal.fire({
          title: 'Modificado!',
          text: "Se ha modificado satisfactoriamente!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok!'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "../mantenedor";
          }
        })
      }).catch(error => {
        Swal.fire(
          'Error',
          error,
          'error'
        )
      });
    }
  });
}

function crearPintura() {
  const formulario = document.getElementById('form_agregar');

  fetch(formulario.action, {
    method: formulario.method,
    body: new FormData(formulario)
  }).then(response => {
    Swal.fire({
      title: 'Creado!',
      text: "Se ha creado satisfactoriamente!",
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../mantenedor";
      }
    })
  }).catch(error => {
    Swal.fire(
      'Error',
      error,
      'error'
    )
  });
}

function goBack(){
  window.history.back();
}

function decrementValue(id) {
  var input = document.getElementById("stepperInput"+id);
  if (input.value > 0) {
    input.value = parseInt(input.value) - 1;
  }
}

function incrementValue(id) {
  var input = document.getElementById("stepperInput"+id);
  input.value = parseInt(input.value) + 1;
}

function cargarMoneda() {
  let divDolar = document.getElementById("valor_dolar");
  let divUtm = document.getElementById("valor_utm");
  let divUf = document.getElementById("valor_uf");
  let divEuro = document.getElementById("valor_euro");
  fetch("https://mindicador.cl/api")
  .then(response => response.json())
  .then(data => {
    let fechaInfo = data.fecha;
    let dolar = data.dolar.valor;
    let uf = data.uf.valor;
    let utm = data.utm.valor;
    let euro = data.euro.valor;
    let bitcoin = data.bitcoin.valor;

    divDolar.textContent = "$" + dolar.toLocaleString();
    divUtm.textContent = "$" + utm.toLocaleString();
    divUf.textContent = "$" + uf.toLocaleString();
    divEuro.textContent = "$" + euro.toLocaleString();
  })
  .catch(error => {
    console.error("Error al obtener el tipo de cambio:", error);
  });
}