export default class CustomerPaymentAPI {


    token = localStorage.getItem('jwtToken');

    async savePayment(PaymentModel) {
        return new Promise((resolve, reject) => {
            const data = {
                payment_id: PaymentModel.payment_id,
                loan_id: PaymentModel.loan_id,
                amount: PaymentModel.amount,
                payment_type: PaymentModel.payment_type,
                date: PaymentModel.date
            };
            console.log(JSON.stringify(data) + " customer payment");
            console.log(this.token)
            $.ajax({
                url: "http://localhost:8080/api/v1/payment/savePayment",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + this.token
                },
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    switch (xhr.status) {
                        case 400:
                            Swal.fire("Bad Request", "The request was invalid. Please check your input and try again.", "error");
                            break;
                        case 401:
                            Swal.fire("Unauthorized", "You are not authorized to perform this action.", "warning");
                            break;
                        case 403:
                            Swal.fire("Forbidden", "You do not have permission to access this resource.", "error");
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
