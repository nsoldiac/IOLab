from app import db


order_links = db.Table('order_links', 
    db.Column('customer_id', db.Integer, db.ForeignKey('customer.id')),
    db.Column('order_id', db.Integer, db.ForeignKey('order.id'))
)

class Customer(db.Model):
	# __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    company = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))

    # You need to a relationship to Address table here
    addresses = db.relationship('Address', backref="customer")
    
# Your Address code goes here
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street_address = db.Column(db.String(500), unique=False)
    city = db.Column(db.String(100))
    state = db.Column(db.String(2))
    country = db.Column(db.String(2))
    zip_code = db.Column(db.String(2))
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    
    def __repr__(self):
        return '<Address %r>' % self.street_address

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_spent = db.Column(db.String(20))
    num_parts_ordered = (db.Integer)

    # You need to a relationship to Customer table here
    customers = db.relationship('Customer', secondary=order_links, backref=db.backref('order'))

    def __repr__(self):
        return '<Order %r>' % self.id

