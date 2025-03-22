"use client";

import useUserSubmit from "../hooks/useUserSubmit";
import Uploader from "../imageUploader/Uploader";
import { useMainContext } from "../provider/MainContextStore";
const UpdateProfile = () => {
  const { handleSubmit, updateProfile, register, errors } = useUserSubmit();
  const { imageUrl, setImageUrl } = useMainContext();
  // console.log("imageUrl..", imageUrl);

  return (
    <>
      <div className="update-profile bg-white py-5 px-4">
        <h6 className="mb-4">Update Profile</h6>
        <form onSubmit={handleSubmit(updateProfile)} className="profile-form">
          <div className="file-upload text-center rounded-3 mb-5">
            <Uploader
              folder="profile"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
          </div>
          <div className="row g-4">
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Hasan Abu"
                  {...register("name")}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Uttura-12 number sector, Dhaka"
                  {...register("address")}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Phone/Mobile</label>
                <input
                  type="number"
                  placeholder="01773289420"
                  {...register("phone")}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="themetags@gmail.com"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Birthday</label>
                <input
                  type="date"
                  {...register("birthday", {
                    required: "Birthday is required",
                    validate: (value) =>
                      new Date(value) < new Date() ||
                      "Birthday cannot be in the future",
                  })}
                />
                {errors.birthday && (
                  <p className="error-message">{errors.birthday.message}</p>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("userName")}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-6">
            Update Profile
          </button>
        </form>
      </div>
      {/* <div className="change-password bg-white py-5 px-4 mt-4 rounded">
        <h6 className="mb-4">Change Password</h6>
        <form className="password-reset-form">
          <div className="row g-4">
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Email Address</label>
                <input type="email" placeholder="themetags@gmail.com" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Current Password</label>
                <input type="password" placeholder="Current password" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>New Password</label>
                <input type="password" placeholder="New password" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="label-input-field">
                <label>Re-type Password</label>
                <input type="password" placeholder="Confirm password" />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-6">
            Change Password
          </button>
        </form>
      </div> */}
    </>
  );
};

export default UpdateProfile;
