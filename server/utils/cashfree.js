import cfConfig from '../config/pg.js';
import { CFPaymentGateway } from 'cashfree-pg-sdk-nodejs';
async function orderCreateCF(order) {
    try {
        var apiInstance = new CFPaymentGateway();
        var result = await apiInstance.orderCreate(cfConfig, {
            orderId: order._id,
            orderAmount: order.totalPrice,
            orderCurrency: 'INR',
            customerDetails: {
                customerId: order.user._id,
                customerPhone: order.user.phone,
                customerEmail: order.user.email
            },
            orderMeta: {
                returnUrl: `http://localhost:3000/order/${order._id}`
              },
        });
        if (result != null) {
            return result
        }
    } catch (error) {
        return error
    }
}

async function getPaymentCF(orderId) {
    try {
        var apiInstance = new CFPaymentGateway();
        var response = await apiInstance.getPaymentsForOrder(
            cfConfig,
            orderId
        );
        if (response !== null) {
            return response
            // if (response?.cfPaymentsEntities)
            //     console.log(response?.cfPaymentsEntities[0].cfPaymentId);
            // console.log(response?.cfHeaders);
        }
    } catch (error) {
        return error
    }
}

export {
    orderCreateCF,
    getPaymentCF
}