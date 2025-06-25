import React from 'react'
import EsummitImg1 from '../../assets/images/foundation/EsummitImg1.png'
import EsummitImg2 from '../../assets/images/foundation/EsummitImg2.png'
import EsummitImg3 from '../../assets/images/foundation/EsummitImg3.png'
import EsummitImg4 from '../../assets/images/foundation/EsummitImg4.png'
const Esummit = () => {
  return (
    <div>
              <div className='mb-16'>
          <h1 className="font-sans text-center font-bold text-4xl text-red-600 transform scale-y-120">
            NIT RAIPUR <span  className="font-sans text-center font-bold text-4xl text-black transform scale-y-120">E-SUMMIT [2022]</span>
          </h1>
        </div>

        <div  className="max-w-4xl mx-auto p-4 ">
         <p className="text-center text-lg mb-8"><strong className="text-red-600">INFINITO </strong>is thrilled to announce its partnership with <strong className="text-red-600">E-Summit '22, NIT Raipur </strong> , a premier platform celebrating innovation, entrepreneurship, and the spirit of creativity. This collaboration underscores our commitment to nurturing young talent and fostering the entrepreneurial ecosystem in India. We are equally proud to share that our founder, <strong className="text-red-600">Rajan Sharma </strong>, will serve as a jury member of the Business Model Competition at E-summit, NIT Raipur, bringing his expertise and insights to evaluate groundbreaking ideas and inspiring ventures.</p>

          <p className="text-center text-lg">At <strong className="text-red-600">INFINITO </strong>, we believe in empowering visionaries who dare to dream big and innovate fearlessly. Together with E-Summit '22, we look forward to driving meaningful conversations and unlocking the potential of aspiring entrepreneurs.</p>

        </div>

         <div className="flex justify-center p-1 m-20">
                <div className="grid grid-cols-4 gap-6 max-w-7xl">
                  <img
                    src={EsummitImg1}
                    alt="Placeholder 1"
                    className="w-[500px] h-48 object-cover   shadow-sm"
                  />
                  <img
                    src={EsummitImg2}
                    alt="Placeholder 2"
                    className="w-[500px] h-48 object-cover   shadow-sm"
                  />
                  <img
                    src={EsummitImg3}
                    alt="Placeholder 3"
                    className="w-[500px] h-48 object-cover   shadow-sm"
                  />
                  <img
                    src={EsummitImg4}
                    alt="Placeholder 4"
                    className="w-[500px] h-48 object-cover   shadow-sm"
                  />
        
                  
                </div>
              </div>
    </div>
  )
}

export default Esummit
