from django.db.models import fields
from .models import Post, User, Comment, ApiGroup
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance
from django.contrib.auth import get_user_model
from django.db.models import Q
from geopy.geocoders import Nominatim


User = get_user_model()


def filter(filterby, filterterm, queryset):
    if filterby == 'user':
        if filterterm != '' or filterterm is not None:
            queryset = queryset.filter(user__username__icontains=filterterm)
        queryset = queryset.order_by('user__username')
    elif filterby == 'group':
        if filterterm != '' or filterterm is not None:
            queryset = queryset.filter(Q(user__username__icontains=filterterm) | Q(group__name__icontains=filterterm))
            #queryset = queryset.filter(group__name__icontains=filterterm)
        queryset = queryset.order_by('group__name')
    elif filterby == 'locationr':
        if filterterm != '' or filterterm is not None:
            delimeter = filterterm.index(':')
            place = filterterm[:delimeter]
            radius = int (filterterm[delimeter+1:])
            locator = Nominatim(user_agent='myGeocoder')
            location = locator.geocode(place)
            centre = Point(location.longitude, location.latitude)
            queryset = queryset.filter(location__distance_lt = (centre, Distance(km=radius)))
        queryset = queryset.order_by('location')

    elif filterby == 'locationq':
        if filterterm != '' or filterterm is not None:
            delimeter = filterterm.index(':')
            place = filterterm[:delimeter]
            quantity = int (filterterm[delimeter+1:])
            locator = Nominatim(user_agent='myGeocoder')
            location = locator.geocode(place)
            centre = Point(location.longitude, location.latitude)
            total = min(quantity, queryset.count())
            queryset = queryset.filter(location__distance_lt = (centre, Distance(km=20000))).order_by('location')[:total]
        else:
            queryset = queryset.order_by('location')

    elif filterby == 'ascTime':
        queryset = queryset.order_by('updated')
    elif filterby == 'desTime':
        queryset = queryset.order_by('-updated')
    elif filterby == 'catagory':
        queryset = queryset.order_by('category')
            
    # Optionally filters by username
    #username = self.request.query_params.get('username')
    #print(self.request.POST)
    #if username is not None:
    #    queryset = queryset.filter(user__username=username)
    return queryset