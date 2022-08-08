# Generated by Django 4.0.6 on 2022-08-08 10:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='files')),
                ('description', models.CharField(max_length=100)),
                ('meta_data', jsonfield.fields.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='FileLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.SlugField(max_length=100)),
                ('access_type', models.CharField(choices=[('r', 'Read'), ('w', 'write')], max_length=2)),
                ('revoked_at', models.DateTimeField(null=True)),
                ('file', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.file')),
            ],
        ),
        migrations.CreateModel(
            name='LinkAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.filelink')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Library',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('data_type', models.CharField(choices=[(1, 'video'), (2, 'document'), (3, 'audio'), (4, 'image')], max_length=1)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='file',
            name='library',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.library'),
        ),
        migrations.AddField(
            model_name='file',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='library',
            constraint=models.UniqueConstraint(fields=('user', 'name'), name='user_name_unique_library'),
        ),
    ]