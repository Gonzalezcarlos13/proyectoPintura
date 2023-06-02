from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Categoria(models.Model):
    nombre = models.CharField(primary_key=True, max_length=70)

    def __str__(self) -> str:
        return super().__str__()
    
class Artista(models.Model):
    nombre = models.CharField(primary_key=True, max_length=100)

    def __str__(self) -> str:
        return super().__str__()

class Pintura(models.Model):
    idPintura=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=100)
    artista=models.ForeignKey(Artista, on_delete=models.CASCADE, default='nuevo')
    precio=models.IntegerField()
    cantidad=models.IntegerField()
    foto=models.ImageField(upload_to='fotos',null=True,default='fotos/pinturaDefault.png')
    descripcion=models.TextField()
    categoria=models.ForeignKey(Categoria, on_delete=models.CASCADE, default='nuevo')
    usuario=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    

    def __str__(self) -> str:
        return super().__str__()
    
class Contacto(models.Model):
    idContacto=models.AutoField(primary_key=True)
    correo=models.CharField(max_length=100)
    nombre=models.CharField(max_length=100)
    telefono=models.IntegerField()
    fecha=models.DateField()
    comentario=models.TextField()

    def str(self) -> str:
        return super().str()