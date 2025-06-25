import React from "react";
import Banner from "./Banner";
import ArcheryAssociation from "./ArcheryAssociation";
import PressTrust from "./PressTrust";
import Esummit from "./Esummit";
import TedX from "./TedX";
import Collaboration from "./Collaboration";
const Foundation = () => {
  return (
    <>
      <Banner />
      <ArcheryAssociation />
      <PressTrust />
      <Esummit />
      <div className="mb-16">
        <h1 className="font-sans text-center font-bold text-4xl text-red-600 transform scale-y-120">
          INFINITO AT PROFESSIONAL EVENTS
        </h1>
      </div>
      <TedX />
      <Collaboration/>     
 
      <div className="mt-30 mb-10">
        <h1 className="font-sans text-center font-bold text-4xl text-black transform scale-y-120">
          For Collaboration
        </h1>
        <div className='text-black text-center mt-4 font-semibold text-2xl'>
            Mail Us at <span className="text-red-600">business@infinitocomics.com</span>
        </div>
      </div>

    </>
  );
};

export default Foundation;
