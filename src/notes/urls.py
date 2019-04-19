from django.urls import path

from .views import (
    NoteList, NoteDetail, NoteCreate, NoteUpdate, NoteDelete,NodeSearch
)

app_name = 'notes'

urlpatterns = [
    path('', NoteList.as_view(), name='index'),
    path('<int:pk>/', NoteDetail.as_view(), name='detail'),
    path('new/', NoteCreate.as_view(), name='create'),
    path('<int:pk>/edit/', NoteUpdate.as_view(), name='update'),
    path('<int:pk>/delete/', NoteDelete.as_view(), name='delete'),
    path('search', NodeSearch.as_view(), name='search')
]
