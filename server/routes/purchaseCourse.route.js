import express  from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';

const router = express.Router();

router.post("/checkout/create-checkout-session",isAuthenticated,createCheckoutSession);
router.post("/webhook",express.raw({type:"application/json"}),stripeWebhook);
router.route("/course/:courseId/details-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated,getAllPurchasedCourse);

export default router;

