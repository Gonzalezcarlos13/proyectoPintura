from django.shortcuts import render
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,logout,login as login_aut

# Create your views here.
def index(request):
    pintura= Pintura.objects.order_by("idPintura")[:3]
    pintura2= Pintura.objects.order_by("idPintura")
    categoria= Categoria.objects.all()
    contexto={"pinturas":pintura, 'pinturas2': pintura2, "categorias": categoria}

    return render(request,"index.html", contexto)

def detalle(request,id):
    idPintura= Pintura.objects.get(idPintura=id)
    contexto={"pintura":idPintura}
    return render(request,"detalle.html", contexto)

def formulario(request):
    contexto = {'evento': '', 'mensaje': ''}
    if request.POST:
        correo = request.POST.get("txtCorreo")
        nombre = request.POST.get("txtNombre")
        telefono = request.POST.get("txtTelefono")
        fecha_str = request.POST.get("txtFecha")
        comentario = request.POST.get("txtComentario")

        contacto = Contacto(
            correo = correo,
            nombre = nombre,
            telefono = telefono,
            fecha = fecha_str,
            comentario = comentario
        )
        contacto.save()
        contexto['evento'] = 'Enviado'
        contexto['mensaje'] = 'Mensaje enviado exitosamente'

    return render(request,"formulario.html",contexto)

def galeria(request):
    pintura= Pintura.objects.all()
    categorias= Categoria.objects.all()
    contexto={"pinturas":pintura, "categorias": categorias}

    return render(request,"galeria.html", contexto)

def registro(request):
    return render(request,"registrarse.html")

def carrito(request):
    pinturas= Pintura.objects.all()
    contexto={'pinturas': pinturas}
    return render(request,"carrito.html", contexto)

def index_admin(request):
    return render(request,"index_admin.html")

def mantenedor(request):
    if request.POST:
        nombre = request.POST.get("nombre")
        nombreArtista = request.POST.get("cbxArtista")
        precio = request.POST.get("precio")
        cantidad = request.POST.get("cantidad")
        foto = request.FILES.get("foto")
        descripcion = request.POST.get("descripcion")
        nombreCategoria = request.POST.get("cbxCategoria")
        user = request.POST.get("hiddenUser")
        categoria = Categoria.objects.get(nombre=nombreCategoria)
        artista = Artista.objects.get(nombre=nombreArtista)
        usuario = User.objects.get(username=user)

        if foto is not None :
            cuadro = Pintura(
                nombre = nombre,
                artista = artista,
                precio = precio,
                cantidad = cantidad,
                foto = foto,
                descripcion = descripcion,
                categoria = categoria,
                usuario = usuario
            )
        else:
            cuadro = Pintura(
                nombre = nombre,
                artista = artista,
                precio = precio,
                cantidad = cantidad,
                descripcion = descripcion,
                categoria = categoria,
                usuario = usuario
            )
        cuadro.save()
    categorias= Categoria.objects.all()
    artistas= Artista.objects.all()
    pinturas= Pintura.objects.all()
    contexto={'categorias':categorias, 'artistas': artistas, 'pinturas': pinturas}
    return render(request,"mantenedor.html", contexto)

def buscar_nombre(request):
    nombre = request.POST.get("txtNombre")
    artista = request.POST.get("txtArtista")
    pintura = Pintura.objects.filter(nombre__contains=nombre,artista__contains=artista)
    contexto={"pinturas":pintura}
    
    return render(request,"galeria.html", contexto)

def filtrar_index(request):
    nombre = request.POST.get("txtNombre")
    artista = request.POST.get("txtArtista")
    categoria = request.POST.get("cbxCategoria")

    pinturas= Pintura.objects.order_by("idPintura")[:4]
    pinturas2 = Pintura.objects.filter(nombre__contains=nombre, artista__nombre__contains=artista, categoria__nombre__contains=categoria)
    categorias= Categoria.objects.all()

    contexto={'pinturas':pinturas, 'pinturas2':pinturas2, 'categorias':categorias}

    return render(request,"index.html", contexto)

def filtrar_galeria(request):
    nombre = request.POST.get("txtNombre")
    artista = request.POST.get("txtArtista")
    categoria = request.POST.get("cbxCategoria")

    categorias= Categoria.objects.all()
    pinturas = Pintura.objects.filter(nombre__contains=nombre, artista__nombre__contains=artista, categoria__nombre__contains=categoria)

    contexto={'pinturas':pinturas, 'categorias':categorias}

    return render(request,"galeria.html", contexto)

def login(request):
    contexto={"mensaje":""}
    if request.POST:
        usuario= request.POST.get("txtUser")
        pas = request.POST.get("txtPass")
        us = authenticate(request,username=usuario,password=pas)
        if us is not None and us.is_active:
            login_aut(request,us)
            idPintura= Pintura.objects.order_by("idPintura")[:3]
            contexto={"pinturas":idPintura}

            return render(request,"index.html", contexto)
    contexto={"mensaje": "usuario incorrecto"}
    return render(request,"registrarse.html", contexto)
    
def cerrar_sesion(request):
    logout(request)
    idPintura= Pintura.objects.order_by("idPintura")[:3]
    contexto={"pinturas":idPintura}

    return render(request,"index.html", contexto)


def eliminar_pintura(request, id):
    contexto={'mensaje':''}
    pintura= Pintura.objects.get(idPintura=id)
    categorias= Categoria.objects.all()
    artistas= Artista.objects.all()
    pinturas= Pintura.objects.all()
    contexto={'categorias':categorias, 'artistas': artistas, 'pinturas': pinturas, 'mensaje': ''}

    try:
        pintura.delete()
    except:
        contexto['mensaje']='No se ha podido eliminar'
    return render(request,"mantenedor.html", contexto)

def modificar(request, id):

    nombre = request.POST.get("m_nombre")
    nombreArtista = request.POST.get("m_cbxArtista")
    precio = request.POST.get("m_precio")
    cantidad = request.POST.get("m_cantidad")
    foto = request.FILES.get("m_foto")
    descripcion = request.POST.get("m_descripcion")
    nombreCategoria = request.POST.get("m_cbxCategoria")
    categoria = Categoria.objects.get(nombre=nombreCategoria)
    artista = Artista.objects.get(nombre=nombreArtista)

    pintura = Pintura.objects.get(idPintura=id)
    pintura.nombre = nombre
    pintura.precio = precio
    pintura.cantidad = cantidad
    if foto is not None :
        pintura.foto = foto
    pintura.descripcion = descripcion
    pintura.categoria = categoria
    pintura.artista = artista
    pintura.save()

    categorias= Categoria.objects.all()
    artistas= Artista.objects.all()
    pinturas= Pintura.objects.all()
    contexto={'categorias':categorias, 'artistas': artistas, 'pinturas': pinturas}
    return render(request,"mantenedor.html", contexto)

def registrarse(request):
    contexto = {'evento': '', 'mensaje': ''}
    if request.method == 'POST':
        nombre = request.POST.get("txtNombre")
        apellido = request.POST.get("txtApellido")
        usuario = request.POST.get("txtUser")
        password1 = request.POST.get("txtPass")
        password2 = request.POST.get("txtPass2")
        email = request.POST.get("txtEmail")

        if password1 == password2:
            usu = User()
            usu.first_name = nombre
            usu.last_name = apellido
            usu.email = email
            usu.username = usuario
            usu.set_password(password1)

            try:
                usu.save()
                contexto['evento'] = 'Guardado'
                contexto['mensaje'] = 'Usuario registrado exitosamente'
            except:
                contexto['evento'] = 'Error'
                contexto['mensaje'] = 'No se pudo registrar el usuario'
        else:
            contexto['evento'] = 'PassIncorr'
            contexto['mensaje'] = 'Las contraseñas no coinciden'

    return render(request, "registrarse.html", contexto)