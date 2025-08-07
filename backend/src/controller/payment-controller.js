import Payment from "../models/payment.js";
import razorpayInstance from '../utils/razorpay.js'
import { paymentPlans } from '../constant/constants.js'
import User from '../models/User.js'
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

export const createOrder = async (req, res) => {
    try {
        const user = req.user.toObject();
        // console.log("USER: ", user)
        const { membershipType } = req.body;

        const order = await razorpayInstance.orders.create({
            "amount": (paymentPlans[membershipType]) * 100,
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {
                userId: user._id,
                name: user.name,
                email: user.email,
                membershipType
            }
        })

        //on success, save the order in db
        // console.log("created order: ",order)

        const payment = new Payment({
            orderId: order.id,
            amount: order.amount,
            status: order.status,
            receipt: order.receipt,
            notes: order.notes
        });
        // console.log("created PAYMENT: ", payment);

        const savedPayment = await payment.save();


        //return back order details to fronted
        res.status(200).json({
            success: true,
            message: "Successfully created order",
            data: {
                ...savedPayment.toObject(),
                keyId: process.env.RAZORPAY_KEY_ID
            }
        })

    }
    catch (err) {
        console.log("Error creating order in razorpay: ", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create order. Please try again!"
        })
    }
}

export const webhooksetup = async (req, res) => {
    try {
        const webhookSignature = req.get("X-Razorpay-Signature");

        const isWebHookValid = validateWebhookSignature(JSON.stringify(req.body),
            webhookSignature,
            process.env.RAZORPAY_WEBHOOK_SECRET)

        console.log("isWebHookValid: ", isWebHookValid);
        if (!isWebHookValid) {
            return res.status(400).json({ message: "Webhook signature is invalid" })
        }

        //change payment status to paid in db
        const paymentDetails = req.body.payload.payment.entity;

        const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        payment.status = paymentDetails.status;
        await payment.save();

        //add membership to user
        const userId = payment.notes?.userId;
        const membershipType = payment.notes?.membershipType;

        if (!userId || !membershipType) {
            return res.status(400).json({ message: "Missing user ID or membership type" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Set flags based on membershipType
        if (membershipType === "Monthly") {
            user.hasMonthlyMembership = true;
        } else if (membershipType === "HalfYear") {
            user.hasHalfYearlyMembership = true;
        } else if (membershipType === "Annual") {
            user.hasAnnualMembership = true;
        }else if(membershipType === "UltimateKit"){
            user.hasInfinitoUltimateKit = true
        }
        await user.save();
        return res.status(200).json({ message: "Webhook received successfully!" })
    }
    catch (err) {
        console.log("Error setting up webhook: ", err);
        return res.status(500).json({
            success: false,
            message: "webhook set up failed"
        })
    }
}

export const verifyPayment = async (req, res) => {
        try {
            const user = req.user.toJSON();
            console.log("User from payment controller: ", user)
            if (user.isPremium) {
                return res.json({ ...user });
            }
            return res.json({ ...user });
        }
        catch (err) {
            console.log("Error verifying payment: ", err);
        }
    }