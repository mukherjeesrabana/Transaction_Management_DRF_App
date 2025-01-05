# Generated by Django 4.0.10 on 2025-01-02 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('deposit', 'Deposit'), ('withdrawal', 'Withdrawal'), ('transfer', 'Transfer')], default='deposit', max_length=20),
        ),
        migrations.DeleteModel(
            name='TransactionType',
        ),
    ]
