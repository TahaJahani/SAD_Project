# Generated by Django 4.0.6 on 2022-08-20 10:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('access_type', models.CharField(choices=[('r', 'Read'), ('w', 'write')], max_length=2)),
                ('file', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.file')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='linkaccess',
            name='url',
        ),
        migrations.RemoveField(
            model_name='linkaccess',
            name='user',
        ),
        migrations.DeleteModel(
            name='FileLink',
        ),
        migrations.DeleteModel(
            name='LinkAccess',
        ),
    ]
