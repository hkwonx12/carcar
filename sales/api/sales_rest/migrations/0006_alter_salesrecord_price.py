# Generated by Django 4.0.3 on 2023-03-08 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_alter_salesrecord_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesrecord',
            name='price',
            field=models.CharField(max_length=20),
        ),
    ]
