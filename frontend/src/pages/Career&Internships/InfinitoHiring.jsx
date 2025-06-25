import React from 'react';

const steps = [
  {
    id: "01",
    title: "Apply",
    description:
      "Explore open roles across our creative universe. Whether you're an artist, writer, techie, or dreamer—we’d love to hear from you. Fill out the form and send your story our way.",
  },
  {
    id: "02",
    title: "Review",
    description:
      "Our team reviews every application with care. If your profile fits the role, you'll hear from us. Sometimes, we may send over a quick creative challenge before the chat.",
  },
  {
    id: "03",
    title: "Interview",
    description:
      "First, you'll speak with the team lead about your role and vision. If it's a match, you'll meet a mentor who'll dive deeper into how you can grow with us.",
  },
  {
    id: "04",
    title: "Onboarding",
    description:
      "Welcome to the Infinito family! We’ll walk you through our world—processes, culture, and everything in between. You’ll even get a creative buddy to help you settle in.",
  },
];

const InfinitoHiring = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-12">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
        Infinitos’ hiring, explained
      </h2>
      <p className="text-center text-gray-600 text-sm sm:text-base mb-10">
        Not all heroes wear capes — but we do email back.
      </p>

      {/* Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Step number and title */}
            <div className="flex flex-col items-start mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 font-medium text-sm mb-2">
                {step.id}
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{step.title}</h3>
            </div>

            {/* Step description */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfinitoHiring;
