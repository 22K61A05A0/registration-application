from flask import Flask, render_template, request, redirect, flash, url_for

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Necessary for using flash messages
@app.route("/")
def home():
    return render_template("index.html")

# Helper functions for validation
def validate_email(email):
    import re
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(email_regex, email)

def validate_phone(phone):
    return phone.isdigit() and len(phone) == 10

@app.route("/", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Collect form data
        full_name = request.form.get("full_name")
        username = request.form.get("username")
        email = request.form.get("email")
        phone = request.form.get("phone")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")
        gender = request.form.get("gender")

        # Validate form inputs
        if not full_name.strip():
            flash("Full Name is required.", "error")
        elif not username.strip():
            flash("Username is required.", "error")
        elif not validate_email(email):
            flash("Please enter a valid email address.", "error")
        elif not validate_phone(phone):
            flash("Please enter a valid phone number (10 digits).", "error")
        elif len(password) < 6:
            flash("Password must be at least 6 characters long.", "error")
        elif password != confirm_password:
            flash("Passwords do not match.", "error")
        elif gender not in ["male", "female", "prefer_not_to_say"]:
            flash("Please select a valid gender.", "error")
        else:
            flash("Registration Successful!", "success")
            return redirect(url_for("register"))

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
