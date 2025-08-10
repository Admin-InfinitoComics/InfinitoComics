import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: { 
        type: String, 
        required: true 
    },
    paymentId: { 
        type: String 
    },
    signature: { 
        type: String 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        default: 'INR' 
    },
    status: { 
        type: String, 
        enum: ['CREATED', 'PAID', 'FAILED'], 
        default: 'CREATED' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
