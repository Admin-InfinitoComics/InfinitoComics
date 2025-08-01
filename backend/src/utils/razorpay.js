import razorpay from 'razorpay';
import config from '../config/server-config.js';

const instance = new razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_SECRET_KEY,
});

export const createOrder = async (amount, currency = 'INR') => {
    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency: currency,
            receipt: `receipt_${new Date().getTime()}`,
            payment_capture: 1, // Auto capture
        };
        const order = await instance.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
}


