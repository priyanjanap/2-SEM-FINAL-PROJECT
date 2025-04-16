import {UserApi} from "../api/userApi.js";



const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const user_api = new UserApi();


$("#login-btn").on("click", async (event) => {
    event.preventDefault();

    let email = $("#login-userName").val();
    let password = $("#login-password").val();

    if (email !== "" && password !== "") {
        if (validateEmail(email)) {
            let role = await checkCredentials(email, password);

            if (role) {
                console.log("User Role:", role);

                if (role === "ADMIN") {
                    window.location.replace("../view/Admin/mainWindow.html");
                } else if (role === "CUSTOMER") {
                    window.location.replace("../view/Customer/mainWindow.html");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Role Not Found",
                        text: "Your role could not be identified. Please contact support.",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid credentials. Please try again.",
                });
            }
        } else {
            Swal.fire("Bad Request", "The email format is invalid. Please check your input and try again.", "error");
        }
    } else {
        Swal.fire("Warning", "Please enter both email and password.", "warning");
    }
});

$("#resendCode").on('click', async () => {
    let email = localStorage.getItem('emailAddress');
    let numberPromise = await generateRandomNumber();
    localStorage.setItem('securityKey', numberPromise);
    user_api.sendCodeToChangePassword(email, numberPromise);
    setTimer();
    Swal.fire({
        title: "Sent To Mail",
        text: "Check your mail box!",
        icon: "success"
    });
})
$("#send-code-btn-forgot-password").on('click', async (event) => {
    event.preventDefault();

    let email = $("#forgotPassword-email").val().trim();
    console.log(email);
    let isEmailValid = validateEmail(email);
    if (!isEmailValid) {
        Swal.fire("Invalid Email", "Please check your input and try again.", "warning");
        return;
    }

    try {
        const userResponse = await user_api.searchUserEmail(email);
        console.log(userResponse+"User js")
        const token = userResponse.token;
        console.log(token)

        if (!token) {
            Swal.fire("User Not Found", "No account is associated with this email.", "error");
            return;
        }

        let code = await generateRandomNumber(); // your custom OTP function
        localStorage.setItem("securityKey", code);
        localStorage.setItem("emailAddress", email);
        localStorage.setItem("resetToken", token);

        let isSent = await user_api.sendCodeToChangePassword(email, code);
        if (isSent) {
            $("#modal-forgot-password").modal('hide');
            $("#code-form").modal('show');
            setTimer();
        } else {
            Swal.fire("Error", "Unable to send code. Try again later.", "error");
        }

    } catch (error) {
        console.error(error);
        Swal.fire("Error", "An unexpected error occurred", "error");
    }
});





function setTimer(){
    let time = 60;

    let countdown = setInterval(function () {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        $("#timer").text(minutes + ":" + (seconds < 10 ? "0" + seconds : seconds));

        if (time <= 0) {
            clearInterval(countdown);
            $("#timer").text("Code was expired resend it");
            localStorage.removeItem('securityKey')
        }

        time--; // Decrement the time
    }, 1000);
}
$("#getEmailAndSendCodeBtn").on('click', async () => {
    event.preventDefault();
    let email = $("#email").val();
    let isEmailValid = validateEmail(email);
    if (isEmailValid) {
        let number = await generateRandomNumber();
        localStorage.setItem('securityKey',number);
        localStorage.setItem('emailAddress',email);
        $('#emailInSecondModel').html(`We sent a code to <b>${email}</b>`);
        $("#loading").removeClass('hidden');
        let newVar = await user_api.sendCodeToChangePassword(email,number);
        $("#loading").addClass('hidden');
        if (newVar){
            $("#forgotPasswordModal").modal('hide');
            $("#passwordResetModal").modal('show');
            setTimer();
        }else {
            Swal.fire("Server Error Try Again later");
            $("#forgotPasswordModal").modal('hide');
        }

    } else {
        Swal.fire({
            title: "Invalid Email",
            text: "The Email was invalid. Please check your input and try again.r",
            icon: "info"
        });
    }
})

function getInputValueAsInteger() {
    const value = $('.code-input input')
        .map(function () {
            return $(this).val(); // Get the value of each input
        })
        .get() // Convert jQuery collection to plain array
        .join(''); // Concatenate the values as a string

    return value ? parseInt(value, 10) : 0; // Convert the concatenated string to an integer
}

$("#secondModelNextBtn").on('click', () => {
    event.preventDefault();
    let inputValueAsInteger = getInputValueAsInteger();
    let code = localStorage.getItem('securityKey');
    if (inputValueAsInteger == code){
        $("#passwordResetModal").modal('hide');
        $("#setNewPasswordModal").modal('show');
    }else {
        Swal.fire({
            title: "Invalid Code",
            text: "Check Again and Enter",
            icon: "info"
        });
    }
})
$("#confirmPasswordInput").on('keyup', () => {
    let password = $("#passwordInput").val();
    let confirmPassword = $("#confirmPasswordInput").val();

    console.log(password + "  " + confirmPassword)
    if (password != confirmPassword) {
        $("#confirmPasswordInput").css({
            boxShadow: "0 0 0 0.25rem rgba(255, 0, 0, 0.25)",
            borderColor: "#dc3545"
        })
    } else {
        $("#confirmPasswordInput").css({
            boxShadow: "0 0 0 0.25rem rgba(0, 123, 255, 0.25)",
            borderColor: "#ced4da"
        })
    }

})
function clearAllFields(){
    $("#passwordInput").val("");
    $("#confirmPasswordInput").val("");
    $("#email").val("");
}
$("#resetPasswordBtn").on('click', async () => {
    let password = $("#passwordInput").val();
    let confirmPassword = $("#confirmPasswordInput").val();
    let email = localStorage.getItem('emailAddress');
    if (password == confirmPassword) {
        let newVar = await user_api.changePassword(email, password);
        if (newVar){
            $("#setNewPasswordModal").modal('hide');
            Swal.fire({
                title: "Changed",
                text: "You password has been changed",
                icon: "success"
            });
            clearAllFields();
        }
    } else {
        Swal.fire({
            title: "Invalid Password",
            text: "Check Again and Enter",
            icon: "info"
        });
    }
})
async function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}
function validateEmail(email) {
    return emailRegex.test(email);
}

async function checkCredentials(email, password) {
    try {
        let role = await user_api.signIn(email, password);
        return role;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}
$("#create-account-btn").on('click', async (event) => {
    event.preventDefault();

    const userModel = {
        user_id: $("#user_id").val(),
        email: $("#userEmail-SignupModal").val(),
        password: $("#userPassword-SignupModal").val(),
        role:$("#userRole-SignupModal").val()
    };

    try {

        await  user_api.signUp(userModel);
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful',
            text: 'You have been successfully registered!',
        });

        window.location.replace('index.html');
    } catch (error) {console.log("Sign up failed:", error);
    }

});
$("#signup-btn").on("click", async (event) => {
    event.preventDefault();

    // Get account type
    const accountType = $("#login-AccountType1").val();

    // Get correct account number based on account type
    let accountNumber = "";
    if (accountType === "CREDIT_CARD") {
        accountNumber = $("#creditCardNumber").val();
    } else if (accountType === "DEBIT_CARD") {
        accountNumber = $("#DebitCardNumber").val();
    } else if (accountType === "CURRENT_ACCOUNT") {
        accountNumber = $("#accountNumber").val();
    }

    const userDetailsModel = {
        ncc: $("#signup-NIC").val(),
        account_number: accountNumber,
        account_type: accountType,
        email: $("#signup-email").val(),
        full_name: $("#signup-fullname").val()
    };

    if (!userDetailsModel.ncc || !userDetailsModel.account_number ||
        !userDetailsModel.account_type || !userDetailsModel.email || !userDetailsModel.full_name) {
        alert("⚠️ Please fill in all required fields.");
        return;
    }

    console.log("Submitting user details:", userDetailsModel);

    try {
        await user_api.searchSignup(userDetailsModel);

        // Hide the previous modal
        document.getElementById("popupModal").style.display = "none";

        // ✅ Show your custom modal
        document.getElementById("userPassModal").style.display = "block";

    } catch (error) {
        console.error("API Error:", error);
        alert("❌ You don't have an account in the database.");
    }
});





