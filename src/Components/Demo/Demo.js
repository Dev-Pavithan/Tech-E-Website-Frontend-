import React from 'react';
import './Demo.css';
import video from "./chatvideo.mp4";

export default function Demo() {
  return (
    <div className="demo-section01">
      <section>
        <div className="demo-section">
          <video className="demo-video" controls muted loop autoPlay>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
}


// import React from 'react';
// import './Demo.css';
// import video from "./chatvideo.mp4";

// export default function Demo() {
//   return (
//     <div className="demo-section01">
//       <section>
//         <div className="demo-section">
//           <div className="demo-content">
//             {/* Text Section */}
//             <div className="demo-text">
//               <h2 className="demo-heading">Welcome to Tech-E</h2>
//               <p className="demo-discription">Explore our interactive video demonstration showcasing our product features and benefits.</p>
//             </div>

//             {/* Video Section */}
//             <div className="demo-video-container">
//               <video className="demo-video" controls muted loop autoPlay>
//                 <source src={video} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
