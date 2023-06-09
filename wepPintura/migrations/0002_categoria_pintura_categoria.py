# Generated by Django 4.2 on 2023-05-23 22:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wepPintura', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('nombre', models.CharField(max_length=70, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='pintura',
            name='categoria',
            field=models.ForeignKey(default='nuevo', on_delete=django.db.models.deletion.CASCADE, to='wepPintura.categoria'),
        ),
    ]
