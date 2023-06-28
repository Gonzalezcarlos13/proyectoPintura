
from django.contrib import admin
from django.urls import path,include
from .views import *;

urlpatterns = [
    path('', index,name='IND'),
    path('detalle/<id>', detalle,name='DET'),
    path('formulario', formulario,name='FOR'),
    path('galeria', galeria,name='GAL'),
    path('registro', registro,name='REG'),
    path('registrarse', registrarse,name='REGISTRARSE'),
    path('carrito', carrito,name='CAR'),
    path('index_admin', index_admin,name='IND_ADM'),
    path('mantenedor', mantenedor,name='MAN'),
    path('filtrar_index', filtrar_index,name='FILTRAR_IND'),
    path('filtrar_galeria', filtrar_galeria,name='FILTRAR_GAL'),
    path('login', login,name='LOG'),
    path('logout', cerrar_sesion,name='CERRAR'),
    path('eliminar_pintura/<id>', eliminar_pintura,name='ELIMINAR_PIN'),
    path('modificar/<id>', modificar,name='MODIFICAR'),
    path('agregar_carrito/<id>', agregar_carrito,name='AGREGAR_CARRITO'),
    path('quitar_carrito/<id>', quitar_carrito,name='QUITAR_CARRITO'),
    path('eliminar_carrito/<id>', eliminar_carrito,name='ELIMINAR_CARRITO'),
    path('obtener_cantidad_carrito', obtener_cantidad_carrito, name='obtener_cantidad_carrito'),
]

