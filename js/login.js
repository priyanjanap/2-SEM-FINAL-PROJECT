window.toggleInputField = function () {
    const accountType = document.getElementById("login-AccountType1").value;
    const creditCardField = document.getElementById("creditCardField");
    const debitCardField = document.getElementById("DebitCardField"); // Fixed typo
    const accountNumberField = document.getElementById("accountNumberField");

    creditCardField.style.display = "none";
    debitCardField.style.display = "none";
    accountNumberField.style.display = "none";

    if (accountType === "CREDIT_CARD") {
        creditCardField.style.display = "block";
    } else if (accountType === "DEBIT_CARD") {
        debitCardField.style.display = "block";
    } else if (accountType === "CURRENT_ACCOUNT") {
        accountNumberField.style.display = "block";
    }
};



document.addEventListener('DOMContentLoaded', function () {
    const verifyModal = document.getElementById('verifyModalUniqueId');
    const popupModal = document.getElementById('popupModal');

    const closeVerifyModal = document.getElementById('closeVerifyModalUniqueId');
    const closeVerifyModalButton = document.getElementById('closeVerifyModalUniqueIdButton');


    closeVerifyModal.addEventListener('click', function () {
        verifyModal.style.display = 'none';
        popupModal.style.display = 'block';
    });

    closeVerifyModalButton.addEventListener('click', function () {
        verifyModal.style.display = 'none';
        popupModal.style.display = 'block';
    });

});
document.addEventListener('DOMContentLoaded', function () {
    const verifyModal = document.getElementById('verifyModalUniqueId');
    const successModal = document.getElementById('successModal');
    const closeVerifyModal = document.getElementById('closeVerifyModalUniqueId');
    const closeVerifyBtn = document.getElementById('closeVerifyModalUniqueIdButton');
    const verifyForm = document.getElementById('verifyForm');
    const verificationInput = document.getElementById('verification-code12');
    const verificationMessage = document.getElementById('verification-message12');
    const generatedCodeElement = document.getElementById('generatedCode');
    const mobileVerifyModal = document.getElementById('mobileVerifyModal');
    const signupModal = document.getElementById('userPassModal');
    const signupModalCLose = document.getElementById('closeUserPassModal');


    function openVerifyModal() {
        const verificationCode = generateVerificationCode();

        generatedCodeElement.textContent = verificationCode;

        generatedCodeElement.dataset.code = verificationCode;

        verificationInput.value = '';
        verificationMessage.className = 'verification-message';
        verificationMessage.textContent = '';
        verificationMessage.style.display = 'none';

    }

    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function closeVerifyModalFn() {
        verifyModal.style.display = 'none';
    }


    verifyForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const enteredCode = verificationInput.value.trim();
        const generatedCode = generatedCodeElement.dataset.code;

        if (enteredCode === generatedCode) {
            verificationMessage.className = 'verification-message success';
            verificationMessage.textContent = 'Verification successful!';
            verificationMessage.style.display = 'block';
            // mobileVerifyModal.style.display = 'block'
            signupModal.style.display = 'block'

            setTimeout(function () {
                closeVerifyModalFn();
            }, 1000);
        } else {
            verificationMessage.className = 'verification-message error';
            verificationMessage.textContent = 'Invalid verification code. Please try again.';
            verificationMessage.style.display = 'block';


            verificationInput.classList.add('shake');
            setTimeout(() => {
                verificationInput.classList.remove('shake');
            }, 500);
        }
    });
    signupModalCLose.addEventListener('click', function (e) {
        e.preventDefault();
        signupModal.style.display = 'none';

    })

    verificationInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').substring(0, 6);
    });

    closeVerifyModal.addEventListener('click', closeVerifyModalFn);
    closeVerifyBtn.addEventListener('click', closeVerifyModalFn);

    //
    // if (document.getElementById('signup-btn')) {
    //     document.getElementById('signup-btn').addEventListener('click', function (e) {
    //         e.preventDefault();
    //         openVerifyModal();
    //     });
    // }


});

document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
</style>
`);

function loadForgotpassword(e) {
    const forgotPassword = document.getElementById('login-forgot-password');
    const forgotPasswordModal = document.getElementById('modal-forgot-password');
    const popupmoda1l = document.getElementById('popupModal');
    forgotPassword.addEventListener('click', function (e) {
        e.preventDefault()
        popupmoda1l.style.display = 'bock';
        forgotPasswordModal.style.display = 'block';

    });

}

loadForgotpassword();