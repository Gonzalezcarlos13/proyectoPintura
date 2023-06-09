# Generated by Django 4.2 on 2023-06-01 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wepPintura', '0005_pintura_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contacto',
            fields=[
                ('idContacto', models.AutoField(primary_key=True, serialize=False)),
                ('correo', models.CharField(max_length=100)),
                ('nombre', models.CharField(max_length=100)),
                ('telefono', models.IntegerField()),
                ('fecha', models.DateField()),
                ('comentario', models.TextField()),
            ],
        ),
    ]
