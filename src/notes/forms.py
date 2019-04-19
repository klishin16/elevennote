from django import forms

from .models import Note

class NoteForm(forms.ModelForm):

    class Meta:
        model = Note
        fields = ['title', 'body', 'tags']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['tags'].widget.attrs\
            .update({
                'type': 'text',
                'data-role': 'tagsinput'
            })

