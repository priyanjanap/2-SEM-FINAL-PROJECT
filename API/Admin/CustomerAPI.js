import { customers } from "db/db.js";
import { CustomerModel } from "model/customerModel";

const customerModel = new CustomerModel();

export default class CustomerAPI {

    constructor() {
        this.token = localStorage.getItem('jwtToken');
    }

    async getAllCustomers() {
        customers.length = 0;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/api/v1/customer/customer-details",
                type: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                },
                success: function(response) {
                    response.forEach(customer => {
                        customers.push(new customerModel(
                            customer.userID,
                            customer.userName,
                            customer.accountType,
                            customer.accountNumber,
                            customer.NCC,
                            customer.email
                        ));
                    });
                    resolve(customers);
                },
                error: function(xhr, status, error) {
                    switch (xhr.status) {
                        case 400:
                            Swal.fire("Bad Request", "The request was invalid. Please check your input and try again.", "error");
                            break;
                        case 401:
                            Swal.fire("Unauthorized", "You are not authorized to perform this action.", "warning");
                            break;
                        case 403:
                            Swal.fire("Forbidden", "You do not have permission to access this resource.", "error");
                            Swal.fire({
                                title: "The Session expired?",
                                text: "You have to log in again to the system?",
                                icon: "question"
                            }).then(() => {
                                window.location.replace('index.html');
                                localStorage.removeItem("securityKey");
                                localStorage.removeItem("jwtToken");
                            });
                            break;
                        case 404:
                            Swal.fire("Not Found", "The requested resource could not be found.", "info");
                            break;
                        case 500:
                            Swal.fire("Server Error", "An error occurred on the server. Please try again later.", "error");
                            break;
                        default:
                            Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
                            break;
                    }
                    reject(error);
                }
            });
        });
    }
}

