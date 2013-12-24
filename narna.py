from flask import Flask, render_template, redirect, copy_current_request_context, request, flash
from flask.ext.compass import Compass
from flask.ext.mail import Mail, Message
from threading import Thread

app = Flask(__name__)
app.config.from_object('config')
compass = Compass(app)
mail = Mail(app)

from flask.ext.wtf import Form
from wtforms import TextField, TextAreaField, SubmitField
from wtforms.fields.html5 import EmailField
from wtforms.validators import Required

class Contact(Form):
    name = TextField('Name', validators=[Required()])
    subject = TextField('Subject', validators=[Required()])
    message = TextAreaField('Message', validators=[Required()], description="Include contact details such as in-game name, an email or skype name")
    submit = SubmitField('Send')

@app.route('/', methods=['GET', 'POST'])
def index():
    form = Contact()
    if form.validate_on_submit():
        @copy_current_request_context
        def send_message():
            msg = Message("Narna.me contact form", recipients=app.config['ADMINS'])
            msg.body = render_template('email.txt', data=form.data, request=request)
            mail.send(msg)

        Thread(name='mail_sender', target=send_message).start()
        flash("Your message has been sent!")
        return redirect('/') # Because laziness

    return render_template('index.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
