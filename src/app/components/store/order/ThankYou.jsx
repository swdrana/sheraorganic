"use client";

import Link from "next/link";

const ThankYou = ({ orderCode }) => {
  return (
    <section className="ptb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-white rounded-2 p-5 text-center shadow-sm">
              <div className="mb-4">
                <span className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: 72, height: 72 }}>
                  <i className="fa-solid fa-check fs-4"></i>
                </span>
              </div>
              <h3 className="mb-2">আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h3>
              <p className="text-muted mb-4">অর্ডার নম্বর: #G-Store: {orderCode}</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                <Link href={`/invoice/${orderCode}`} className="btn btn-primary">
                  View Order
                </Link>
                <Link href="/" className="btn btn-secondary">
                  Home
                </Link>
                <Link href="/my-account" className="btn btn-outline-primary">
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;