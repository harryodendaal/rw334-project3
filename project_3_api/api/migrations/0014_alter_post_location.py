# Generated by Django 3.2.3 on 2021-06-09 20:01

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_post_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326),
        ),
    ]
