class Carrito:
    def __init__(self, request):
        self.request = request
        self.session = request.session
        carrito = request.session.get("carrito")
        if not carrito:
            self.session["carrito"]={}
            self.carrito = self.session["carrito"]
        else:
            self.carrito = carrito

    def agregar(self, producto):
        id = str(producto.idPintura)
        if id not in self.carrito.keys():
            self.carrito[id]={
                "idPintura":producto.idPintura,
                "nombre":producto.nombre,
                "precio":producto.precio,
                "cantidad":1,
                "total":producto.precio,
                "foto":producto.foto.url
            }
            self.actualizar()
        else:
            self.carrito[id]["cantidad"]+=1
            self.carrito[id]["total"]+=producto.precio
            self.actualizar()


    def quitar(self, producto):
        id = str(producto.idPintura)
        if id in self.carrito.keys():
            self.carrito[id]["cantidad"]-=1
            self.carrito[id]["total"]-=producto.precio
            if self.carrito[id]["cantidad"] == 0:
                self.eliminar(producto)
        self.actualizar()

    def actualizar(self):
        self.session["carrito"] = self.carrito
        self.session.modified = True

    def eliminar(self, producto):
        id = str(producto.idPintura)
        if id in self.carrito.keys():
            del self.carrito[id]
            self.actualizar()

    def vaciar(self):
        self.session["carrito"]={}
        self.session.modified = True

    def contar_cantidades(self):
        total_cantidad = 0
        for item in self.carrito.values():
            total_cantidad += item.get("cantidad", 0)
        return total_cantidad
    
    def listar(self):
        return self.carrito