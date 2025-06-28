import React from "react";
import logo from "../../assets/images/foundation/logo.png";
import img1 from "../../assets/images/foundation/img1.png";
import img2 from "../../assets/images/foundation/img2.png";
import img3 from "../../assets/images/foundation/img3.png";
import img4 from "../../assets/images/foundation/img4.png";
import img5 from "../../assets/images/foundation/img5.png";
import img6 from "../../assets/images/foundation/img6.png";
import img7 from "../../assets/images/foundation/img7.png";
import img8 from "../../assets/images/foundation/img8.png";
const ArcheryAssociation = () => {
  return (
    <>
      <div className="flex flex-col my-14">

        <div>
          <h1 className="font-sans text-center font-bold text-4xl text-red-600 transform scale-y-120">
            BIHAR ARCHERY ASSOCIATION
          </h1>
        </div>

        <span className="flex justify-center items-center w-full h-full my-10">
          <img src={logo} alt="logo" className="max-w-full h-auto" />
        </span>

        <div className=" mx-80 p-4">
          <p className="text-justify text-lg">
            INFINITO is honored to collaborate with the{" "}
            <strong className="text-red-600"> Bihar Archery Association</strong>{" "}
            as the{" "}
            <strong className="text-red-600">
              Official Merchandise Partner
            </strong>{" "}
            for the prestigious{" "}
            <strong className="text-red-600">Archery National Games</strong>.
            This partnership reflects our commitment to supporting sports and
            celebrating the spirit of excellence and determination that athletes
            embody. Through this collaboration, INFINITO aims to inspire and
            empower athletes while fostering a stronger connection with the
            sporting community.
          </p>
        </div>
      </div>

      <div className="flex justify-center p-1 mb-20">
        <div className="grid grid-cols-4 gap-6 max-w-7xl">
          {/* Row 1 */}
          <img
            src={img1}
            alt="Placeholder 1"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
          <img
            src={img2}
            alt="Placeholder 2"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
          <img
            src={img3}
            alt="Placeholder 3"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
          <img
            src={img4}
            alt="Placeholder 4"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />

          {/* Row 2 */}
          <img
            src={img5}
            alt="Placeholder 5"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
          <img
            src={img6}
            alt="Placeholder 6"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
          <img
            src={img7}
            alt="Placeholder 7"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
          <img
            src={img8}
            alt="Placeholder 8"
            className="w-[500px] h-48 object-cover   shadow-sm"
          />
        </div>
      </div>
    </>
  );
};

export default ArcheryAssociation;
