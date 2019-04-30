from django.contrib.auth import authenticate, login
from django.views.generic import FormView

from .forms import UserCreationForm

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from notes.models import User
from django.http import HttpResponse

#from django.core.mail import send_mail
#from django.conf import settings


class RegisterView(FormView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    success_url = '/'

    def form_valid(self, form):
        form.save()

        email = self.request.POST['email']
        password = self.request.POST['password1']

        user = authenticate(email=email, password=password)
        login(self.request, user)

        token = account_activation_token.make_token(user)
        user.token = token

        current_site = get_current_site(self.request)
        mail_subject = 'Activate your blog account.'
        message = render_to_string('acc_active_email.html', {
            'domain': current_site.domain,
            'email': email,
            'token': token,
        })
        send_email = EmailMessage(mail_subject, message, to=[email])
        send_email.send()

        #subject = 'Thank you for registering to our site'
        #message = ' it  means a world to us '
        #email_from = settings.EMAIL_HOST_USER
        #print(email_from)
        #recipient_list = ['klishin.nd17@gmail.com',]

        #send_mail( subject, message, email_from, recipient_list)
        return super(RegisterView, self).form_valid(form)

def activate(request):
    if request.method == 'GET':
        email = request.GET['email']
        token = request.GET['token']
        user = User.objects.filter(email=email)[0]
        if(user.token != token):
            response = HttpResponse("Successful confimation.")
        else:
            response = HttpResponse("Invalid confimation.")
        return response


