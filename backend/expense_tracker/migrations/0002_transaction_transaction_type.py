# Generated by Django 4.0.10 on 2025-01-08 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expense_tracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('Expense', 'Expense'), ('Credit', 'Credit')], default='Expense', max_length=20),
        ),
    ]
