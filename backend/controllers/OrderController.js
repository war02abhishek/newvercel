import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"

// import { validate } from "../models/orderModel.js"

// Create new order
export const newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            order,
        });

    }
    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// Get Single Order
export const getSingleOrder = async (req, res, next) => {

    try {
        //user ke id se order find karna hai and id se hi name and email jaanleya 'populate' ne
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get logged in user's orders
export const myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get all orders -- ADMIN ONLY
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();

        let totalAmount = 0;

        //admin ko dashboard par show ho sake esleye total amount nikaal rahe
        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        if (!orders) {
            return next(new ErrorHandler("No orders found", 404));
        }

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update order status -- Admin
export const updateOrderStatus = async (req, res, next) => {
    try {
        console.log("Updating order status")
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("Order already delivered", 400));
        }

        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (order) => {
                await updateStock(order.product, order.quantity);
            });
        }

        order.orderStatus = req.body.status;
        if (req.body.status === "Delivered") {

            //pahle shipped hoga fir delivery hoga so ek baar update stock karne par dusre baar karne ke jarurat nahi hai
        //   order.orderItems.forEach(async (order) => {
        //     await updateStock(order.product, order.quantity);
        //   });
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            // order,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

async function updateStock(id, quantity) {

    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}






// Delete order -- Admin
export const deleteOrder = async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        await order.remove();

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
