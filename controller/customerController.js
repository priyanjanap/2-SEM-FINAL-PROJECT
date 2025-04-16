import CustomerAPI from "../API/Admin/CustomerAPI";

const customerAPI = new CustomerAPI();

class CustomerController {
    constructor() {
        this.customerTableBody = document.getElementById('customerTableBody');
    }

    async loadCustomers() {
        try {
            const customers = await customerAPI.getAllCustomers();
console.log("customerController")
            this.customerTableBody.innerHTML = '';

            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.userID}</td>
                    <td>${customer.userName}</td>
                    <td>${customer.accountType}</td>
                    <td>${customer.accountNumber}</td>
                    <td>${customer.NCC}</td>
                    <td>${customer.email}</td>
                `;
                this.customerTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading customers:', error);
        }
    }
}

const customerController = new CustomerController();
customerController.loadCustomers();