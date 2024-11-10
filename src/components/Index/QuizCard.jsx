// /* eslint-disable react/prop-types */
// import { motion, useInView } from 'framer-motion';
// import React from 'react';
// import { GridLoader } from 'react-spinners';

// const Loader = () => (
//   <div className="w-full flex items-center justify-center p-3">
//     <GridLoader color="#4f197f" margin={20} size={30} width={10} />
//   </div>
// );

// const QuizImage = ({ src, onLoad, isLoading }) => (
//   <img
//     onLoad={onLoad}
//     src={src}
//     alt="Quiz Background"
//     className={`w-full h-full object-cover rounded mb-4 transition-all ${isLoading ? 'hidden' : 'block'}`}
//   />
// );

// const QuizCard = ({ quiz }) => {
//   const [loading, setLoading] = React.useState(true);
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const handleClick = () => {
//     console.log('card clicked');
//   };

//   return (
//     <motion.div
//       onClick={handleClick}
//       ref={ref}
//       initial={{ opacity: 0, y: 30 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       exit={{ x: -300 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
//     >
//       <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
//         <h1 className="text-5xl" style={{ fontFamily: 'Jaro' }}>
//           {quiz.title}
//         </h1>
//         <p className="mt-2 text-lg">{quiz.description}</p>
//       </div>

//       {loading && <Loader />}
      
//       <QuizImage
//         src="./assets/backgrounds/5.jpg"
//         onLoad={() => setLoading(false)}
//         isLoading={loading}
//       />
//     </motion.div>
//   );
// };

// export default QuizCard;


/* eslint-disable react/prop-types */
import { useState } from 'react';

const QuizImage = ({ src, onLoad, isLoading }) => (
  <img
    onLoad={onLoad}
    src={src}
    alt="Quiz Background"
    className={`w-full h-full object-cover rounded mb-4 transition-all ${isLoading ? 'hidden' : 'block'}`}
  />
);

const Loader = () => (
  <div className="w-full flex items-center justify-center p-3">
    <div className="loader"></div>
  </div>
);

const QuizCard = ({ quiz }) => {
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    console.log('card clicked');
  };

  return (
    <div
      onClick={handleClick}
      className="quiz-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
    >
      <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className="text-5xl" style={{ fontFamily: 'Jaro' }}>
          {quiz.title}
        </h1>
        <p className="mt-2 text-lg">{quiz.description}</p>
      </div>

      {loading && <Loader />}

      <QuizImage
        src="./assets/backgrounds/5.jpg"
        onLoad={() => setLoading(false)}
        isLoading={loading}
      />
    </div>
  );
};

export default QuizCard;