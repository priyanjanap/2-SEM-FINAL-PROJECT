document.addEventListener('DOMContentLoaded', function() {
    // Form sections
    const formSections = [
        // Section 1: Personal Information
        `
        <div id="personal-info-section">
            <h2>Personal Information</h2>
            <div class="form-group">
                <label for="fullName">1. Full Name:</label>
                <input type="text" id="fullName" required>
            </div>
            <div class="form-group">
                <label for="nic">2. National Identity Card (NIC) No:</label>
                <input type="text" id="nic" required>
            </div>
            <div class="form-group">
                <label for="dob">3. Date of Birth:</label>
                <input type="date" id="dob" required>
            </div>
            <div class="form-group">
                <label>4. Gender:</label>
                <div class="radio-group">
                    <label><input type="radio" name="gender" id="genderMale" value="Male"> Male</label>
                    <label><input type="radio" name="gender" id="genderFemale" value="Female"> Female</label>
                    <label><input type="radio" name="gender" id="genderOther" value="Other"> Other</label>
                </div>
            </div>
            <div class="form-group">
                <label>5. Marital Status:</label>
                <div class="radio-group">
                    <label><input type="radio" name="maritalStatus" id="statusSingle" value="Single"> Single</label>
                    <label><input type="radio" name="maritalStatus" id="statusMarried" value="Married"> Married</label>
                    <label><input type="radio" name="maritalStatus" id="statusDivorced" value="Divorced"> Divorced</label>
                    <label><input type="radio" name="maritalStatus" id="statusWidowed" value="Widowed"> Widowed</label>
                </div>
            </div>
            <div class="form-group">
                <label for="contactNumber">6. Contact Number:</label>
                <input type="tel" id="contactNumber" required>
            </div>
            <div class="form-group">
                <label for="email">7. Email Address:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="residentialAddress">8. Residential Address:</label>
                <textarea id="residentialAddress" required></textarea>
            </div>
            <div class="form-group">
                <label for="postalAddress">9. Postal Address (if different):</label>
                <textarea id="postalAddress"></textarea>
            </div>
            <div class="form-group">
                <label for="dependents">10. Number of Dependents:</label>
                <input type="number" id="dependents" min="0" required>
            </div>
        </div>
        `,

        // Section 2: Employment Details
        `
        <div id="employment-details-section">
            <h2>Employment Details</h2>
            <div class="form-group">
                <label for="employerName">1. Employer's Name:</label>
                <input type="text" id="employerName" required>
            </div>
            <div class="form-group">
                <label for="employerAddress">2. Employer's Address:</label>
                <textarea id="employerAddress" required></textarea>
            </div>
            <div class="form-group">
                <label for="jobTitle">3. Job Title/Designation:</label>
                <input type="text" id="jobTitle" required>
            </div>
            <div class="form-group">
                <label for="monthlySalary">4. Monthly Salary (LKR):</label>
                <input type="number" id="monthlySalary" min="0" required>
            </div>
            <div class="form-group">
                <label for="employmentLength">5. Length of Employment:</label>
                <input type="text" id="employmentLength" placeholder="e.g., 3 years 2 months" required>
            </div>
            <div class="form-group">
                <label for="otherIncome">6. Other Sources of Income (if any):</label>
                <input type="text" id="otherIncome">
            </div>
            <div class="form-group">
                <label for="totalIncome">7. Total Monthly Income (LKR):</label>
                <input type="number" id="totalIncome" min="0" required>
            </div>
            <div class="form-group">
                <label>8. Employment Type:</label>
                <div class="radio-group">
                    <label><input type="radio" name="employmentType" id="typePermanent" value="Permanent"> Permanent</label>
                    <label><input type="radio" name="employmentType" id="typeContract" value="Contract"> Contract</label>
                    <label><input type="radio" name="employmentType" id="typeSelfEmployed" value="Self-Employed"> Self-Employed</label>
                    <label><input type="radio" name="employmentType" id="typeOther" value="Other"> Other</label>
                </div>
            </div>
        </div>
        `,

        // Section 3: Loan Details
        `
        <div id="loan-details-section">
            <h2>Loan Details</h2>
            <div class="form-group">
                <label for="loanAmount">1. Loan Amount Requested (LKR):</label>
                <input type="number" id="loanAmount" min="0" required>
            </div>
            <div class="form-group">
                <label for="loanPurpose">2. Loan Purpose:</label>
                <input type="text" id="loanPurpose" required>
            </div>
            <div class="form-group">
                <label for="loanTenure">3. Loan Tenure (Months/Years):</label>
                <input type="text" id="loanTenure" placeholder="e.g., 24 months" required>
            </div>
            <div class="form-group">
                <label>4. Preferred Repayment Method:</label>
                <div class="radio-group">
                    <label><input type="radio" name="repaymentMethod" id="methodBankTransfer" value="Bank Transfer"> Bank Transfer</label>
                    <label><input type="radio" name="repaymentMethod" id="methodSalaryDeduction" value="Salary Deduction"> Salary Deduction</label>
                    <label><input type="radio" name="repaymentMethod" id="methodCheques" value="Post-dated Cheques"> Post-dated Cheques</label>
                    <div class="inline-field">
                        <label><input type="radio" name="repaymentMethod" id="methodOther" value="Other"> Other:</label>
                        <input type="text" id="otherRepaymentMethod">
                    </div>
                </div>
            </div>
        </div>
        `,

        // Section 4: Collateral Details
        `
        <div id="collateral-details-section">
            <h2>Collateral Details (if applicable)</h2>
            <div class="form-group">
                <label>1. Type of Collateral Provided:</label>
                <div class="radio-group">
                    <label><input type="radio" name="collateralType" id="collateralProperty" value="Property"> Property</label>
                    <label><input type="radio" name="collateralType" id="collateralVehicle" value="Vehicle"> Vehicle</label>
                    <label><input type="radio" name="collateralType" id="collateralFixedDeposit" value="Fixed Deposit"> Fixed Deposit</label>
                    <div class="inline-field">
                        <label><input type="radio" name="collateralType" id="collateralOther" value="Other"> Other:</label>
                        <input type="text" id="otherCollateralType">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="collateralValue">2. Estimated Value (LKR):</label>
                <input type="number" id="collateralValue" min="0">
            </div>
            <div class="form-group">
                <label>3. Ownership Documents Provided:</label>
                <div class="radio-group">
                    <label><input type="radio" name="documentsProvided" id="documentsYes" value="Yes"> Yes</label>
                    <label><input type="radio" name="documentsProvided" id="documentsNo" value="No"> No</label>
                </div>
            </div>
            <div class="form-group">
                <label for="collateralDocuments">Upload Documents:</label>
                <input type="file" id="collateralDocuments" class="file-input" multiple>
            </div>
        </div>
        `,

        // Section 5: Guarantor Details
        `
        <div id="guarantor-details-section">
            <h2>Guarantor Details (if applicable)</h2>
            <div class="form-group">
                <label for="guarantorName">1. Guarantor Name:</label>
                <input type="text" id="guarantorName">
            </div>
            <div class="form-group">
                <label for="guarantorNic">2. Guarantor NIC No:</label>
                <input type="text" id="guarantorNic">
            </div>
            <div class="form-group">
                <label for="guarantorContact">3. Guarantor Contact Number:</label>
                <input type="tel" id="guarantorContact">
            </div>
            <div class="form-group">
                <label for="guarantorRelationship">4. Relationship to Applicant:</label>
                <input type="text" id="guarantorRelationship">
            </div>
            <div class="form-group">
                <label for="guarantorEmployment">5. Guarantor Employment Status:</label>
                <input type="text" id="guarantorEmployment">
            </div>
            <div class="form-group">
                <label for="guarantorIncome">6. Guarantor Monthly Income (LKR):</label>
                <input type="number" id="guarantorIncome" min="0">
            </div>
        </div>
        `,

        // Section 6: Banking Details & Additional Information
        `
        <div id="banking-additional-section">
            <h2>Banking Details</h2>
            <div class="form-group">
                <label for="bankName">1. Bank Name:</label>
                <input type="text" id="bankName" required>
            </div>
            <div class="form-group">
                <label for="branch">2. Branch:</label>
                <input type="text" id="branch" required>
            </div>
            <div class="form-group">
                <label for="accountNumber">3. Account Number:</label>
                <input type="text" id="accountNumber" required>
            </div>
            <div class="form-group">
                <label>4. Account Type:</label>
                <div class="radio-group">
                    <label><input type="radio" name="accountType" id="accountSavings" value="Savings"> Savings</label>
                    <label><input type="radio" name="accountType" id="accountCurrent" value="Current"> Current</label>
                    <label><input type="radio" name="accountType" id="accountOther" value="Other"> Other</label>
                </div>
            </div>
            
            <h2>Additional Information</h2>
            <div class="form-group">
                <label>1. Do you have any existing loans?</label>
                <div class="radio-group">
                    <label><input type="radio" name="existingLoans" id="loansYes" value="Yes"> Yes</label>
                    <label><input type="radio" name="existingLoans" id="loansNo" value="No"> No</label>
                </div>
            </div>
            <div class="form-group" id="existingLoanDetails" style="display: none;">
                <label for="loanSpecify">If yes, please specify:</label>
                <input type="text" id="loanSpecify">
            </div>
            <div class="form-group" id="loanRepaymentAmount" style="display: none;">
                <label for="monthlyRepayment">2. Monthly Loan Repayment Amount (LKR):</label>
                <input type="number" id="monthlyRepayment" min="0">
            </div>
            <div class="form-group">
                <label>3. Are you currently facing any financial difficulties?</label>
                <div class="radio-group">
                    <label><input type="radio" name="financialDifficulties" id="difficultiesYes" value="Yes"> Yes</label>
                    <label><input type="radio" name="financialDifficulties" id="difficultiesNo" value="No"> No</label>
                </div>
            </div>
            <div class="form-group" id="financialDifficultiesDetails" style="display: none;">
                <label for="difficultiesExplain">If yes, please explain:</label>
                <textarea id="difficultiesExplain"></textarea>
            </div>
        </div>
        `,

        // Section 7: Declaration
        `
        <div id="declaration-section">
            <h2>Declaration</h2>
            <div class="form-group">
                <p>I, <span id="declarationName"></span>, hereby declare that the above-provided information is true and correct to the best of my knowledge. I agree to abide by the terms and conditions set forth by the lending institution.</p>
            </div>
            <div class="form-group">
                <label for="applicantSignature">Signature of Applicant:</label>
                <input type="text" id="applicantSignature" required>
            </div>
            <div class="form-group">
                <label for="signatureDate">Date:</label>
                <input type="date" id="signatureDate" required>
            </div>
            <div class="form-group" id="guarantorSignatureSection" style="display: none;">
                <label for="guarantorSignature">Signature of Guarantor:</label>
                <input type="text" id="guarantorSignature">
            </div>
            <div class="form-group" id="guarantorDateSection" style="display: none;">
                <label for="guarantorDate">Date:</label>
                <input type="date" id="guarantorDate">
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="agreeTerms" required> I agree to the terms and conditions
                </label>
            </div>
        </div>
        `
    ];

    // DOM Elements
    const formContent = document.getElementById('form-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const currentStepEl = document.getElementById('current-step');
    const totalStepsEl = document.getElementById('total-steps');

    // Variables
    let currentStep = 1;
    const totalSteps = formSections.length;

    // Initialize the form
    function initForm() {
        formContent.innerHTML = formSections[0];
        totalStepsEl.textContent = totalSteps;
        currentStepEl.textContent = currentStep;

        // Add event listeners
        prevBtn.addEventListener('click', goToPrevStep);
        nextBtn.addEventListener('click', goToNextStep);
        submitBtn.addEventListener('click', submitForm);
        cancelBtn.addEventListener('click', cancelForm);

        // Initialize any conditional display logic for the first section
        setupConditionalFields();
    }

    // Go to the next step
    function goToNextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateForm();
            }
        } else {
            alert('Please fill in all required fields before proceeding.');
        }
    }

    // Go to the previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateForm();
        }
    }

    // Update the form based on current step
    function updateForm() {
        // Update current step display
        currentStepEl.textContent = currentStep;

        // Update form content
        formContent.innerHTML = formSections[currentStep - 1];

        // Update button visibility
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
        nextBtn.style.display = currentStep < totalSteps ? 'block' : 'none';
        submitBtn.style.display = currentStep === totalSteps ? 'block' : 'none';

        // Setup conditional fields for the current section
        setupConditionalFields();

        // If on declaration page, populate applicant name
        if (currentStep === totalSteps) {
            const fullNameValue = localStorage.getItem('fullName') || '';
            document.getElementById('declarationName').textContent = fullNameValue;

            // Show guarantor signature fields if guarantor info was provided
            const guarantorName = localStorage.getItem('guarantorName') || '';
            if (guarantorName.trim() !== '') {
                document.getElementById('guarantorSignatureSection').style.display = 'block';
                document.getElementById('guarantorDateSection').style.display = 'block';
            }
        }
    }

    // Set up conditional display fields for the current section
    function setupConditionalFields() {
        // For Banking & Additional Information section
        if (document.getElementById('loansYes')) {
            document.getElementById('loansYes').addEventListener('change', function() {
                document.getElementById('existingLoanDetails').style.display = 'block';
                document.getElementById('loanRepaymentAmount').style.display = 'block';
            });

            document.getElementById('loansNo').addEventListener('change', function() {
                document.getElementById('existingLoanDetails').style.display = 'none';
                document.getElementById('loanRepaymentAmount').style.display = 'none';
            });
        }

        if (document.getElementById('difficultiesYes')) {
            document.getElementById('difficultiesYes').addEventListener('change', function() {
                document.getElementById('financialDifficultiesDetails').style.display = 'block';
            });

            document.getElementById('difficultiesNo').addEventListener('change', function() {
                document.getElementById('financialDifficultiesDetails').style.display = 'none';
            });
        }

        // Restore values from localStorage if they exist

    }

    // Save form values to localStorage for the current section
    function saveFormValues() {
        const inputs = formContent.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    localStorage.setItem(input.name, input.value);
                }
            } else if (input.type === 'checkbox') {
                localStorage.setItem(input.id, input.checked);
            } else {
                localStorage.setItem(input.id, input.value);
            }
        });
    }


    function validateCurrentStep() {
        const requiredFields = formContent.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });

        // If valid, save the form values
        if (isValid) {
            saveFormValues();
        }

        return isValid;
    }

    // Submit the form
    function submitForm() {
        if (validateCurrentStep()) {
            // In a real application, you would typically send the form data to a server here
            alert('Form submitted successfully! Thank you for your application.');

            // For demonstration purposes, let's log all the collected data
            console.log('Form Data:', getAllFormData());

            // Clear all saved data and reset the form
            localStorage.clear();
            currentStep = 1;
            updateForm();
        } else {
            alert('Please complete all required fields before submitting.');
        }
    }

    // Get all form data from localStorage
    function getAllFormData() {
        // const formData = {};
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     formData[key] = localStorage.getItem(key);
        // }
        // return formData;
    }

    // Cancel the form
    function cancelForm() {
        if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            localStorage.clear();
            currentStep = 1;
            updateForm();
        }
    }

    // Initialize the form
    initForm();
});