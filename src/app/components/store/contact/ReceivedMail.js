import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../common/others/Loading";

export default function ReceivedMail() {
  const [emailData, setEmailData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    services: [],
    text: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;

    if (type === "checkbox") {
      setEmailData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, id]
          : prev.services.filter((service) => service !== id),
      }));
    } else {
      setEmailData({ ...emailData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/v1/recive-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
      console.log("response in contac", response);
      if (response.ok) {
        setLoading(false);
        toast.success("Your gmail successfuly sent");
        setEmailData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          services: [],
          text: "",
        });
      } else {
        toast.error("Failed to send the message.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="col-xl-7">
      <form
        onSubmit={handleSubmit}
        className="contact-form ps-5 ps-xl-4 py-6 pe-6"
      >
        <h3 className="mb-6">Need Help? Send Message</h3>
        <div className="row g-4">
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={emailData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={emailData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Recipient Email"
                value={emailData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone"
                value={emailData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="checkbox-fields d-flex align-items-center gap-3 flex-wrap my-2">
              <div className="single-field d-inline-flex align-items-center gap-2">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="delivery"
                    onChange={handleChange}
                    checked={emailData.services.includes("delivery")}
                  />
                  <span className="checkbox-field">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <label htmlFor="delivery" className="text-dark fw-semibold">
                  Delivery Problem
                </label>
              </div>
              <div className="single-field d-inline-flex align-items-center gap-2">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="service"
                    onChange={handleChange}
                    checked={emailData.services.includes("service")}
                  />
                  <span className="checkbox-field">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <label htmlFor="service" className="text-dark fw-semibold">
                  Customer Service
                </label>
              </div>
              <div className="single-field d-inline-flex align-items-center gap-2">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="others"
                    onChange={handleChange}
                    checked={emailData.services.includes("others")}
                  />
                  <span className="checkbox-field">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <label htmlFor="others" className="text-dark fw-semibold">
                  Others Service
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="label-input-field">
              <label>Messages</label>
              <textarea
                name="text"
                placeholder="Your message"
                value={emailData.text}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-md rounded-1 mt-6"
        >
          Send Message
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
