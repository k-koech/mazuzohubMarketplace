from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def send_new_password(id,name,password,receiver):
    # Creating message subject and sender
    subject = 'Password Reset'
    sender = 'noreply@developerske.com'

    #passing in the context vairables
    html_content = render_to_string('password_template/sendpassword.html',{"id":id,"name": name,  "password":password})
    text_content = render_to_string('password_template/sendpassword.txt',{"id":id,"name": name, "password":password})

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()

def send_user_credentials(username,password,receiver):
    # Creating message subject and sender
    subject = 'LTO New Account'
    sender = 'noreply@developerske.com'

    #passing in the context vairables    
    html_content = render_to_string('newuser/credentials.html',{"username": username,  "password":password})
    text_content = render_to_string('newuser/credentials.txt',{"username": username, "password":password})

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()


def send_message(name,subject,message,email):
    # Creating message subject and sender
    subject = 'New Message'
    sender = email

    #passing in the context vairables    
    html_content = render_to_string('sendmessage/sendmessage.html',{"name": name,  "subject":subject, "email": email, "message":message})
    text_content = render_to_string('sendmessage/sendmessage.txt',{"name": name, "subject":subject, "email": email, "message":message})

    msg = EmailMultiAlternatives(subject,text_content,sender,["lydia@ltobrandingandmarketing.com"])
    msg.attach_alternative(html_content,'text/html')
    msg.send()
  