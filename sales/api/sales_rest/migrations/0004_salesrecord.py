# Generated by Django 4.0.3 on 2023-03-07 23:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_customer_alter_salesperson_employee_num'),
    ]

    operations = [
        migrations.CreateModel(
            name='SalesRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('auto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='inventory', to='sales_rest.inventoryvo')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='salesrecords', to='sales_rest.customer')),
                ('salesperson', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='salesrecords', to='sales_rest.salesperson')),
            ],
        ),
    ]
