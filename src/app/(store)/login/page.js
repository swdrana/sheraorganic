"use client";
import Login from "../../components/store/auth/Login";
import PreLoader from "../../components/store/common/others/PreLoader";
import useSetting from "../../components/store/dataFetching/useSetting";

const page = () => {
  const { setting, settingLoading } = useSetting();
  return (
    <>
      {settingLoading ? (
        <PreLoader />
      ) : (
        <>
          <Login setting={setting} />
        </>
      )}
    </>
  );
};

export default page;
