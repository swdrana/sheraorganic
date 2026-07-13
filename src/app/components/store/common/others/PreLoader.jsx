"use client";
const PreLoader = () => {
  return (
    <>
      <div id="preloader">
        <div className="preloader-spinner">
          <div className="spinner-leaf"></div>
          <div className="spinner-leaf"></div>
          <div className="spinner-leaf"></div>
        </div>
        <style>{`
          #preloader {
            position: fixed;
            inset: 0;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          .preloader-spinner {
            width: 60px;
            height: 60px;
            position: relative;
            animation: preloader-rotate 1.2s linear infinite;
          }
          .spinner-leaf {
            position: absolute;
            width: 20px;
            height: 20px;
            background: #4CAF50;
            border-radius: 50% 50% 0 50%;
            transform-origin: 100% 100%;
          }
          .spinner-leaf:nth-child(1) {
            top: 0; left: 0;
            transform: rotate(0deg);
            background: #4CAF50;
          }
          .spinner-leaf:nth-child(2) {
            top: 0; right: 0;
            transform: rotate(90deg);
            background: #81C784;
          }
          .spinner-leaf:nth-child(3) {
            bottom: 0; right: 0;
            transform: rotate(180deg);
            background: #A5D6A7;
          }
          @keyframes preloader-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default PreLoader;
