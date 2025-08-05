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

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-gray-900">📜 Terms of Use</h1>
          <p className="text-gray-700 text-lg">
            Please read these terms carefully. By using Infinito Comics, you agree to abide by the following terms and conditions, designed for the AVGC (Animation, VFX, Gaming, Comics) industry.
          </p>
          <a
            href="/TermsOfService.pdf"
            download
            className="inline-block mt-4 bg-[#FF2D2D] text-white px-4 py-2 rounded font-semibold text-sm hover:bg-red-700 transition"
          >
            Download Terms of Use PDF
          </a>
        </motion.div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-red-600 font-medium border-b pb-2">
          <Link to="/" className="hover:underline transition-colors duration-300">Home</Link>
          <span>›</span>
          <span className="text-black font-bold">Terms of Use</span>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          <Section title="Acceptance of Terms" icon="✅">
            <p>
              By accessing or using Infinito Comics, you agree to comply with these Terms of Use and all applicable laws and regulations in the AVGC sector.
            </p>
          </Section>

          <Section title="User Conduct" icon="🧑‍💻">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Do not use the platform for unlawful, harmful, or abusive activities.</li>
              <li>Respect intellectual property rights of creators, artists, and other users.</li>
              <li>Do not attempt to hack, disrupt, or misuse any part of the website or its services.</li>
              <li>Do not upload or share offensive, inappropriate, or unauthorized content.</li>
            </ul>
          </Section>

          <Section title="Content Ownership & Licensing" icon="🎨">
            <ul className="list-disc pl-5 text-gray-700">
              <li>All comics, artwork, and AVGC content are owned by Infinito Comics or respective licensors.</li>
              <li>Users may not reproduce, distribute, or modify content without explicit permission.</li>
              <li>Any user-generated content may be used by Infinito Comics for promotional or operational purposes, with credit to the creator.</li>
            </ul>
          </Section>

          <Section title="Purchases & Payments" icon="💳">
            <ul className="list-disc pl-5 text-gray-700">
              <li>All purchases are subject to our Refund Policy and processed securely.</li>
              <li>Users must provide accurate payment information and agree to pay all applicable charges.</li>
            </ul>
          </Section>

          <Section title="Limitation of Liability" icon="⚠️">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Infinito Comics is not liable for any indirect, incidental, or consequential damages arising from use of the platform.</li>
              <li>We strive for accuracy but do not guarantee uninterrupted or error-free service.</li>
            </ul>
          </Section>

          <Section title="Changes to Terms" icon="🔄">
            <p>
              Infinito Comics reserves the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
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
          “Your experience and safety matter. Please follow our terms to help us build a creative and respectful AVGC community.”
        </motion.div>
      </div>
    </div>
  );
};
export default TermsOfService;