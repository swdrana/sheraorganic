import Skeleton from "../common/skeletonLoader/Skeleton";

const SkeletonLoading = () => {
  return (
    <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
      <div className="row align-items-center g-4">
        <div className="col-xl-6">
          <Skeleton height="400px" borderRadius="8px" />
          <div className="mt-4 d-flex">
            <Skeleton width="60px" height="60px" borderRadius="8px" />
            <Skeleton
              width="60px"
              height="60px"
              borderRadius="8px"
              className="ms-2"
            />
            <Skeleton
              width="60px"
              height="60px"
              borderRadius="8px"
              className="ms-2"
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="d-flex flex-column gap-4">
            <Skeleton height="24px" width="80%" />
            <Skeleton height="16px" width="60%" className="mt-2" />
            <Skeleton height="16px" width="40%" className="mt-1" />
            <Skeleton height="100px" width="100%" className="mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
