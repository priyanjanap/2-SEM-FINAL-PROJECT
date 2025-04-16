
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('popupModal');
    const closeBtn = document.getElementById('closeModal');
    const loginBtn1 = document.getElementById("loginBtn")

    loginBtn1.addEventListener('click',
        function () {
            PopUP();
        }

        )
    function PopUP(){
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        tabContents.forEach(content => {
            if (content.id === tabId + '-tab') {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.getAttribute('data-tab'));
        });
    });

    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');


    // signupBtn.addEventListener('click', function() {
    //     console.log('Signup attempted');
    //     document.getElementById('signup-tab').classList.remove('active');
    // });


});

document.addEventListener('DOMContentLoaded', function() {
   const modal = document.getElementById('popupModal');
    const closeBtn = document.getElementById('closeModal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');



    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            this.classList.add('active');

            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });



    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }


    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });



    window.openLoginModal = function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        tabBtns[0].classList.add('active');
        document.getElementById('login-tab').classList.add('active');

        openModal();
    };

    window.openSignupModal = function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        tabBtns[1].classList.add('active');
        document.getElementById('signup-tab').classList.add('active');

        openModal();
    };
});
// document.addEventListener('DOMContentLoaded', function() {
//     // Get modal elements
//     const mobileVerifyModal = document.getElementById('mobileVerifyModal');
//     const otpVerifyModal = document.getElementById('otpVerifyModal');
//     const userPassModal = document.getElementById('userPassModal');
//
//     // Get all close buttons
//     const closeMobileModal = document.getElementById('closeMobileModal');
//     const closeOtpModal = document.getElementById('closeOtpModal');
//     const closeUserPassModal = document.getElementById('closeUserPassModal');
//
//     // Get form elements
//     const mobileForm = document.getElementById('mobileForm');
//     const otpForm = document.getElementById('otpForm');
//     const userPassForm = document.getElementById('userPassForm');
//
//     // Get other UI elements
//     const closeMobileBtn = document.getElementById('closeMobileBtn');
//     const backToMobileBtn = document.getElementById('back-to-mobile');
//     const displayMobile = document.getElementById('displayMobile');
//     const closeCreateAccountBtn = document.getElementById('closeCreateAccountBtn');
//     const passwordToggle = document.getElementById('passwordToggle');
//
//     // OTP input references
//     const otpInputs = [
//         document.getElementById('otp1'),
//         document.getElementById('otp2'),
//         document.getElementById('otp3'),
//         document.getElementById('otp4')
//     ];
//
//     // Messages
//     const mobileMessage = document.getElementById('mobile-message');
//     const otpMessage = document.getElementById('otp-message');
//     const userpassMessage = document.getElementById('userpass-message');
//
//     // Timer elements
//     const timerElement = document.getElementById('timer');
//     const timerText = document.getElementById('timer-text');
//     const resendLink = document.getElementById('resend-link');
//
//     // Variables
//     let mobileNumber = '';
//     let countryCode = '';
//     let timerInterval;
//     let otpCode = '';
//
//     // Event Listeners
//     closeMobileModal.addEventListener('click', () => mobileVerifyModal.style.display = 'none');
//     closeOtpModal.addEventListener('click', () => otpVerifyModal.style.display = 'none');
//     closeUserPassModal.addEventListener('click', () => userPassModal.style.display = 'none');
//     closeMobileBtn.addEventListener('click', () => mobileVerifyModal.style.display = 'none');
//     closeCreateAccountBtn.addEventListener('click', () => userPassModal.style.display = 'none');
//     backToMobileBtn.addEventListener('click', () => {
//         otpVerifyModal.style.display = 'none';
//         mobileVerifyModal.style.display = 'block';
//         clearInterval(timerInterval);
//     });
//
//     // Toggle password visibility
//     passwordToggle.addEventListener('click', function() {
//         const passwordField = document.getElementById('password');
//         if (passwordField.type === 'password') {
//             passwordField.type = 'text';
//             this.textContent = 'Hide';
//         } else {
//             passwordField.type = 'password';
//             this.textContent = 'Show';
//         }
//     });
//
//     // Handle OTP input focus and auto-advance
//     otpInputs.forEach((input, index) => {
//         // Auto focus next input
//         input.addEventListener('input', function() {
//             if (this.value.length === 1) {
//                 if (index < otpInputs.length - 1) {
//                     otpInputs[index + 1].focus();
//                 }
//             }
//         });
//
//         // Handle backspace
//         input.addEventListener('keydown', function(e) {
//             if (e.key === 'Backspace' && this.value === '' && index > 0) {
//                 otpInputs[index - 1].focus();
//             }
//         });
//
//         // Only allow numbers
//         input.addEventListener('keypress', function(e) {
//             if (!/[0-9]/.test(e.key)) {
//                 e.preventDefault();
//             }
//         });
//     });
//
//     // Handle mobile form submission
//     mobileForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//
//         // Get form values
//         countryCode = document.getElementById('country-code').value;
//         mobileNumber = document.getElementById('mobile-number').value;
//
//         // Validate mobile number
//         if (!mobileNumber || mobileNumber.length < 7) {
//             mobileMessage.textContent = 'Please enter a valid mobile number';
//             mobileMessage.className = 'verification-message error-message';
//             return;
//         }
//
//         // Generate a random 4-digit OTP
//         otpCode = Math.floor(1000 + Math.random() * 9000).toString();
//
//         // Set mobile number in the OTP modal
//         displayMobile.textContent = countryCode + ' ' + mobileNumber;
//
//         // Start the timer
//         startTimer();
//
//         // Show success message
//         mobileMessage.textContent = 'Verification code sent successfully!';
//         mobileMessage.className = 'verification-message success-message';
//
//         // Switch modals
//         setTimeout(function() {
//             mobileVerifyModal.style.display = 'none';
//             otpVerifyModal.style.display = 'block';
//
//             // Clear OTP fields
//             otpInputs.forEach(input => input.value = '');
//             otpInputs[0].focus();
//
//             // Show OTP in console (for demo purposes only)
//             console.log('Your OTP is: ' + otpCode);
//         }, 1000);
//     });
//
//     // Handle OTP form submission
//     otpForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//
//         // Get entered OTP
//         const enteredOTP = otpInputs.map(input => input.value).join('');
//
//         // Validate OTP
//         if (enteredOTP === otpCode) {
//             // Clear timer
//             clearInterval(timerInterval);
//
//             // Show success message
//             otpMessage.textContent = 'OTP verified successfully!';
//             otpMessage.className = 'verification-message success-message';
//
//             // Switch to username/password modal
//             setTimeout(function() {
//                 otpVerifyModal.style.display = 'none';
//                 userPassModal.style.display = 'block';
//             }, 1000);
//         } else {
//             // Show error message
//             otpMessage.textContent = 'Invalid OTP. Please try again.';
//             otpMessage.className = 'verification-message error-message';
//         }
//     });
//
//     // Handle user/pass form submission
//     userPassForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//
//         // Get form values
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//
//         // Validate input
//         if (!username || username.length < 3) {
//             userpassMessage.textContent = 'Username must be at least 3 characters';
//             userpassMessage.className = 'verification-message error-message';
//             return;
//         }
//
//         if (!password || password.length < 6) {
//             userpassMessage.textContent = 'Password must be at least 6 characters';
//             userpassMessage.className = 'verification-message error-message';
//             return;
//         }
//
//         // Show success message
//         userpassMessage.textContent = 'Account created successfully!';
//         userpassMessage.className = 'verification-message success-message';
//
//         // Close modal after success
//         setTimeout(function() {
//             userPassModal.style.display = 'none';
//
//             // For demo purposes - log the account details
//             console.log('Account created:', {
//                 phone: countryCode + mobileNumber,
//                 username: username,
//                 password: '****' // Don't log real password
//             });
//         }, 1500);
//     });
//
//     // Resend OTP functionality
//     resendLink.addEventListener('click', function(e) {
//         e.preventDefault();
//
//         // Generate new OTP
//         otpCode = Math.floor(1000 + Math.random() * 9000).toString();
//         console.log('Your new OTP is: ' + otpCode); // For demo purposes
//
//         // Hide resend link and start timer again
//         resendLink.style.display = 'none';
//         timerText.style.display = 'inline';
//
//         // Reset and start timer
//         startTimer();
//
//         // Show message
//         otpMessage.textContent = 'New OTP sent successfully!';
//         otpMessage.className = 'verification-message success-message';
//     });
//
//     function startTimer() {
//         let seconds = 60;
//         timerElement.textContent = seconds;
//
//         if (timerInterval) {
//             clearInterval(timerInterval);
//         }
//
//         timerText.style.display = 'inline';
//         resendLink.style.display = 'none';
//
//         timerInterval = setInterval(function() {
//             seconds--;
//             timerElement.textContent = seconds;
//
//             if (seconds <= 0) {
//                 clearInterval(timerInterval);
//                 timerText.style.display = 'none';
//                 resendLink.style.display = 'inline';
//             }
//         }, 1000);
//     }
//
//     // For demo purposes - function to open the modal
//     window.openMobileVerifyModal = function() {
//         mobileVerifyModal.style.display = 'block';
//     };
// });

const firebaseConfig = {
    apiKey: "AIzaSyC7xVOrWc5TXkc-SrayHKCElqvcPPf3xAs",
    authDomain: "nexolend-sendotp.firebaseapp.com",
    projectId: "nexolend-sendotp",
    storageBucket: "nexolend-sendotp.firebasestorage.app",
    messagingSenderId: "575549820734",
    appId: "1:575549820734:web:6995a914688a94c790266f",
    measurementId: "G-6PR30Z2J86"
};

firebase.initializeApp(firebaseConfig);

const mobileForm = document.getElementById('mobileForm');
const otpForm = document.getElementById('otpForm');
const mobileNumberInput = document.getElementById('mobile-number');
const mobileMessage = document.getElementById('mobile-message');
const otpMessage = document.getElementById('otp-message');
const displayMobile = document.getElementById('displayMobile');
const resendLink = document.getElementById('resend-link');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('timer-text');

// Store verification ID for later
let verificationId = null;
let timerInterval = null;

// Initialize reCAPTCHA Verifier
window.onload = function() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-btn', {
        'size': 'invisible',
        'callback': function(response) {
            sendOTP(); // reCAPTCHA solved, send OTP
        },
        'expired-callback': function() {
            alert("reCAPTCHA expired. Refresh the page and try again.");
        }
    });
};

// Send OTP function
function sendOTP() {
    let phoneNumber = mobileNumberInput.value.trim();

    // Clear previous messages
    mobileMessage.textContent = "";
    mobileMessage.classList.remove("error-message", "success-message");

    if (!phoneNumber) {
        mobileMessage.textContent = "Please enter a phone number";
        mobileMessage.classList.add("error-message");
        return;
    }

    phoneNumber = phoneNumber.replace(/[\s()-]/g, ''); // Remove spaces, dashes, or parentheses

    if (phoneNumber.startsWith("0")) {
        phoneNumber = "+94" + phoneNumber.slice(1); // Convert 07XXXXXXXX to +947XXXXXXXX
    } else if (!phoneNumber.startsWith("+94")) {
        mobileMessage.textContent = "Invalid phone number. Use +947XXXXXXXX or 07XXXXXXXX format.";
        mobileMessage.classList.add("error-message");
        return;
    }

    console.log("Sending OTP to:", phoneNumber);

    const sendCodeBtn = document.getElementById('send-code-btn');
    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = "Sending...";

    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then(function(confirmationResult) {
            verificationId = confirmationResult.verificationId; // Store verification ID

            mobileMessage.textContent = "Verification code sent successfully!";
            mobileMessage.classList.add("success-message");

            displayMobile.textContent = phoneNumber; // Show phone number in modal

            startResendTimer(); // Start resend timer

            document.getElementById('mobileVerifyModal').style.display = "none";
            document.getElementById('otpVerifyModal').style.display = "block";

            otpInputs[0].focus(); // Focus on OTP input

            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = "Send Verification Code";
        })
        .catch(function(error) {
            console.error("Error sending verification code: ", error);
            mobileMessage.textContent = error.message || "Error sending verification code. Please try again.";
            mobileMessage.classList.add("error-message");

            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = "Send Verification Code";

            window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
            });
        });
}

// Verify OTP function
function verifyOTP() {
    const otpInputs = [...document.querySelectorAll('.otp-input')]; // Collect OTP inputs
    const otpCode = otpInputs.map(input => input.value).join('');

    otpMessage.textContent = "";
    otpMessage.classList.remove("error-message", "success-message");

    const verifyBtn = document.getElementById('verify-otp-btn');
    verifyBtn.disabled = true;
    verifyBtn.textContent = "Verifying...";

    if (!verificationId) {
        otpMessage.textContent = "Invalid request. Please try again.";
        otpMessage.classList.add("error-message");
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify OTP";
        return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otpCode);

    firebase.auth().signInWithCredential(credential)
        .then(function(result) {
            otpMessage.textContent = "Phone number verified successfully!";
            otpMessage.classList.add("success-message");

            clearInterval(timerInterval);

            verifyBtn.disabled = false;
            verifyBtn.textContent = "Verify OTP";

            document.getElementById('otpVerifyModal').style.display = "none";
            document.getElementById('userPassModal').style.display = "block";
        })
        .catch(function(error) {
            console.error("Error verifying OTP: ", error);
            otpMessage.textContent = error.message || "Invalid verification code. Please try again.";
            otpMessage.classList.add("error-message");

            verifyBtn.disabled = false;
            verifyBtn.textContent = "Verify OTP";
        });
}

function startResendTimer() {
    resendLink.style.display = "none";
    timerText.style.display = "inline";

    let seconds = 60;
    timerElement.textContent = seconds;

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(function() {
        seconds--;
        timerElement.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(timerInterval);
            timerText.style.display = "none";
            resendLink.style.display = "inline";
        }
    }, 1000);
}

mobileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendOTP();
});

otpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    verifyOTP();
});

resendLink.addEventListener('click', function(e) {
    e.preventDefault();
    sendOTP();
});

document.getElementById('back-to-mobile').addEventListener('click', function() {
    document.getElementById('otpVerifyModal').style.display = "none";
    document.getElementById('mobileVerifyModal').style.display = "block";
    clearInterval(timerInterval);
});

document.getElementById('closeOtpModal').addEventListener('click', function() {
    document.getElementById('otpVerifyModal').style.display = "none";
    clearInterval(timerInterval);
});
