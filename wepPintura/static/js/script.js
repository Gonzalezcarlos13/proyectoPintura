window.onload = function() {
  listarCarrito();
  cargarMoneda();
};

function actualizarCantidadCarrito() {
  let btnLimpiar = document.getElementById("btnLimpiar");
  let btnComprar = document.getElementById("btnComprar");
  let btnIrCarrito = document.getElementById("btnIrCarrito");
  fetch("/obtener_cantidad_carrito")
  .then(response => response.json())
  .then(data => {
    let cantidadCarrito = document.getElementById("numero-carro");
    let cantidad = data.cantidad;
    cantidadCarrito.textContent = cantidad;
    if(cantidad < 1) {
      btnLimpiar.style.display = "none";
      btnComprar.style.display = "none";
      btnIrCarrito.style.width = "100%";
    } else {
      btnLimpiar.style.display = "block";
      btnComprar.style.display = "block";
      btnIrCarrito.style.width = "50%";
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
    }
  })
  .catch(error => {
    console.error("Error al quitar producto a carrito: ", error);
    alert("Error al quitar producto a carrito: " + error);
  });
}

function eliminarCarrito(id) {
  fetch("/eliminar_carrito/"+id)
  .then(response => response.json())
  .then(data => {
    listarCarrito();
  })
  .catch(error => {
    console.error("Error al eliminar producto a carrito: ", error);
    alert("Error al quitar producto a carrito: " + error);
  });
}

function limpiarCarrito(opcion) {
  fetch("/limpiar_carrito")
  .then(response => response.json())
  .then(data => {
    listarCarrito();
    btnLimpiar.style.display = "none";
    if(opcion == "0"){
      Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: 'Se ha limpiado todo el carrito!'
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: 'Se ha comprado con exito!'
      })
    }
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
                  <td>${total}</td>
              </tr>
          </table>
        </td>
        <td style="width: 30%; text-align: center;">
          <button class="btnMasMenos" onclick="quitarCarrito('${item.idPintura}','1')" style="width: 20px; padding: 4px 0px 8px">
              <p style="line-height: 0.1;">-</p>
          </button>
      
          <input type="text" value="${cantidad}" id="stepperInput${item.idPintura}" style="width:30%; height: 20px; text-align: center" readonly>
      
          <button class="btnMasMenos" onclick="agregarCarrito('${item.idPintura}','1')" style="width: 20px; padding: 4px 0px 8px">
              <p style="line-height: 0.1;">+</p>
          </button>
        </td>
        <td style="width: 1%;">
          <img src="http://127.0.0.1:8000/static/img/papelera roja.png" alt="" style="cursor:pointer;" onclick="eliminarCarrito('${item.idPintura}')">
        </td>
      `;

      // Agregar el nuevo elemento <tr> a la tabla
      listaCarrito.appendChild(nuevoTr);
    }
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

    divDolar.textContent = "$" + dolar;
    divUtm.textContent = "$" + utm;
    divUf.textContent = "$" + uf;
    divEuro.textContent = "$" + euro;
  })
  .catch(error => {
    console.error("Error al obtener el tipo de cambio:", error);
  });
}