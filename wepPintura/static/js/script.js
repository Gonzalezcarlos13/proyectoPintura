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