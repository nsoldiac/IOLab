from flask import render_template, redirect, flash # request
from app import app, models, db
from .forms import CustomerForm, AddressForm, OrderForm

@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm()
    if form.validate_on_submit():
        customer = models.Customer(
                            first_name = form.first_name.data,
                            last_name = form.last_name.data,
                            company = form.company.data,
                            email = form.email.data,
                            phone = form.phone.data)
        db.session.add(customer)
        db.session.commit()
        flash('Thanks for registering')
        customer_id = models.Customer.query.filter_by(email=form.email.data).first()
        print("customer_id =",customer_id.id)
        #return add_address(customer_id=str(customer_id.id) )  
        return redirect( '/add_address/'+str(customer_id.id) ) 
    flash_errors(form)
    return render_template('new_customer.html', form=form)

@app.route('/add_address', methods=['GET', 'POST'])
@app.route('/add_address/<customer_id>', methods=['GET', 'POST'])
def add_address(customer_id=None):
    # flash("hello Gov'na!")
    form = AddressForm()
    # print('id:', customer_id)
    customer = models.Customer.query.filter_by(id=customer_id).first()
    full_name = customer.first_name + " " + customer.last_name
    # print("customer:", full_name)
    if form.validate_on_submit() and customer_id:
        address = models.Address(
                            street_address = form.street_address.data,
                            city = form.city.data,
                            state = form.state.data,
                            country = form.country.data,
                            zip_code = form.zip_code.data,
                            customer_id = customer_id)
        # print("-->  I'm here!")
        db.session.add(address)
        db.session.commit()
        return redirect( '/customer_details/'+str(customer.id) ) 
    flash_errors(form)  
    return render_template('new_address.html', form=form, name=full_name)

@app.route('/new_order/<customer_id>', methods=['GET', 'POST'])
def new_order(customer_id=None):
    form = OrderForm()
    # print('id:', customer_id)
    customer = models.Customer.query.filter_by(id=customer_id).first()
    full_name = customer.first_name + " " + customer.last_name
    if form.validate_on_submit() and customer_id:
        order = models.Order(
                            num_parts_ordered = form.num_parts_ordered.data,
                            total_spent = form.total_spent.data)
        order.customers.append(customer)
        db.session.add(order)
        db.session.commit()
        return redirect( '/customer_details/'+str(customer.id) ) 
    flash_errors(form)  
    return render_template('new_order.html', form=form, name=full_name)


@app.route('/customers')
def display_customer():
    customers = models.Customer.query.all()
    return render_template('home.html', customers=customers)

@app.route('/customer_details/<customer_id>')
def display_customer_details(customer_id):
    customer = models.Customer.query.filter_by(id=customer_id).first()
    orders = models.Order.query.filter(models.Order.customers.any()).all()
    print(orders)
    return render_template('customer_details.html', customer=customer, orders=orders)

@app.route('/delete_customer/<customer_id>')
def delete_customer(customer_id):
    customer = models.Customer.query.filter_by(id=customer_id).first()
    # delete all addresses associated with customer
    for address in customer.addresses:
        db.session.delete(address)
    # delete customer
    db.session.delete(customer)
    db.session.commit()
    return redirect('customers')

@app.route('/delete_address/<address_id>')
def delete_address(address_id):
    address = models.Address.query.filter_by(id=address_id).first()
    db.session.delete(address)
    db.session.commit()
    return redirect('customers')

def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ))

