import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Section = ({ title, icon, children }) => (
  <motion.section
    className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-xl font-semibold text-red-700 flex items-center gap-2">
      <span className="text-2xl">{icon}</span>
      {title}
    </h2>
    {children}
  </motion.section>
);

const RefundPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-[#fff6f6] via-[#ffeaea] to-white min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">💸 Refund Policy</h1>
          <p className="text-gray-700 text-lg">
            Our commitment to fairness in the AVGC (Animation, VFX, Gaming, Comics) industry.
          </p>
          <a
            href="/RefundPolicy.pdf"
            download
            className="inline-block mt-4 bg-[#FF2D2D] text-white px-4 py-2 rounded font-semibold text-sm hover:bg-red-700 transition"
          >
            Download Refund Policy PDF
          </a>
        </motion.div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-red-600 font-medium border-b pb-2">
          <Link to="/" className="hover:underline transition-colors duration-300">Home</Link>
          <span>›</span>
          <span className="text-black font-bold">Refund Policy</span>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          <Section title="Eligibility for Refunds" icon="📝">
            <p>
              Purchases made on Infinito Comics, including digital comics, merchandise, subscriptions, and event tickets, are eligible for refunds under specific conditions outlined below.
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Digital products (comics, downloads) are refundable only if the content is inaccessible or corrupted, and reported within 48 hours of purchase.</li>
              <li>Physical merchandise can be refunded or replaced if damaged, defective, or incorrect, provided you notify us within 7 days of delivery.</li>
              <li>Subscription fees are non-refundable once the service period has started, except in cases of technical failure on our end.</li>
              <li>Event tickets are refundable only if the event is canceled or rescheduled by Infinito Comics.</li>
            </ul>
          </Section>

          <Section title="How to Request a Refund" icon="📧">
            <p>
              To initiate a refund, please contact our support team at <a href="mailto:support@infinitocomics.com" className="text-red-600 hover:underline">support@infinitocomics.com</a> with your order details, reason for refund, and any supporting evidence (photos for merchandise).
            </p>
            <p>
              Our team will review your request and respond within 3 business days.
            </p>
          </Section>

          <Section title="Refund Process & Timeline" icon="⏳">
            <p>
              Approved refunds will be processed to your original payment method within 7-10 business days. You will receive a confirmation email once your refund is initiated.
            </p>
            <p>
              For merchandise returns, you may be asked to ship the item back. Return shipping costs are covered only for defective or incorrect items.
            </p>
          </Section>

          <Section title="Exceptions & Important Notes" icon="⚠️">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Refunds are not applicable for change of mind or accidental purchases.</li>
              <li>Downloaded or accessed digital content is generally non-refundable unless proven defective.</li>
              <li>All refund decisions are at the sole discretion of Infinito Comics, in accordance with industry standards.</li>
            </ul>
          </Section>
        </div>

        {/* Footer Quote */}
        <motion.div
          className="pt-8 border-t text-center text-gray-600 italic text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          “We value your experience. If something goes wrong, our team is here to make it right.”
        </motion.div>
      </div>
    </div>
  );
};
export default RefundPolicy;