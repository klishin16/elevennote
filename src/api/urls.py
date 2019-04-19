from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.routers import DefaultRouter

from .views import NoteViewSet, current_user, UserList

app_name = 'api'

router = DefaultRouter(trailing_slash=False)
router.register('notes', NoteViewSet)

urlpatterns = [
    path('jwt-auth/', obtain_jwt_token),
    path('', include(router.urls)),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
