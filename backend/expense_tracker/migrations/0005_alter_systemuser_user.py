# Generated by Django 4.0.10 on 2025-01-12 06:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('expense_tracker', '0004_alter_systemuser_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='systemuser',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
