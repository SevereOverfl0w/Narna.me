from flask import Flask, render_template
app = Flask(__name__)
compass = Compass(app)

from flask.ext.wtf import Form
from wtforms import TextField, TextAreaField, SubmitField
from wtforms.html5 import EmailField
from wtforms.validators import Required

class Contact(Form):
    name = TextField('Name', validators=[Required()])
    subject = TextField('Subject', validators=[Required()])
    message = TextAreaField('Message', validators=[Required()])
    submit = SubmitField('Send')

@app.route('/')
def index():
    form = Contact()
    return render_template('index.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
