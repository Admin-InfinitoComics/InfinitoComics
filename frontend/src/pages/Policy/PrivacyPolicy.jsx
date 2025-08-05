import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ...existing code...
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
const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-900">🔒 Privacy Policy</h1>
          <p className="text-gray-700 text-lg">
            Your privacy matters. Learn how Infinito Comics protects your personal information in the AVGC (Animation, VFX, Gaming, Comics) industry.
          </p>
          <a
            href="/PrivacyPolicy.pdf"
            download
            className="inline-block mt-4 bg-[#FF2D2D] text-white px-4 py-2 rounded font-semibold text-sm hover:bg-red-700 transition"
          >
            Download Privacy Policy PDF
          </a>
        </motion.div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-red-600 font-medium border-b pb-2">
          <Link to="/" className="hover:underline transition-colors duration-300">Home</Link>
          <span>›</span>
          <span className="text-black font-bold">Privacy Policy</span>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          <Section title="Information We Collect" icon="📋">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Personal details such as name, email, and contact information when you register or make purchases.</li>
              <li>Usage data including pages visited, interactions, and preferences to improve your experience.</li>
              <li>Payment information for transactions, processed securely via trusted third-party providers.</li>
              <li>Content submissions, feedback, and communications with our support team.</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information" icon="⚙️">
            <ul className="list-disc pl-5 text-gray-700">
              <li>To provide, personalize, and improve our AVGC-related services and offerings.</li>
              <li>To process orders, subscriptions, and event registrations.</li>
              <li>To communicate updates, offers, and important notices.</li>
              <li>To ensure security, prevent fraud, and comply with legal obligations.</li>
            </ul>
          </Section>

          <Section title="Sharing & Disclosure" icon="🔗">
            <ul className="list-disc pl-5 text-gray-700">
              <li>We do not sell your personal information.</li>
              <li>Information may be shared with trusted partners for payment processing, shipping, or analytics, under strict confidentiality.</li>
              <li>We may disclose information if required by law or to protect our rights and users.</li>
            </ul>
          </Section>

          <Section title="Your Rights & Choices" icon="🛡️">
            <ul className="list-disc pl-5 text-gray-700">
              <li>You can access, update, or delete your personal data by contacting us.</li>
              <li>You may opt out of marketing communications at any time.</li>
              <li>Children’s privacy is protected; we do not knowingly collect data from users under 13 without parental consent.</li>
            </ul>
          </Section>

          <Section title="Data Security" icon="🔒">
            <p>
              We use industry-standard security measures to safeguard your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </Section>
        </div>

        {/* Footer Quote */}
        <motion.div
          className="pt-8 border-t text-center text-gray-600 italic text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          “Your trust is our priority. We are committed to protecting your privacy at every step.”
        </motion.div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
