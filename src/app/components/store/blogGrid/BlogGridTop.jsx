
const BlogGridTop = () => {
  return (
    <>
       <section className="blog-grid-section ptb-120">
            <div className="container">
                <div className="row g-4 align-items-center">
                    <div className="col-xxl-6 col-xl-7">
                        <div className="row g-4">
                            <div className="col-md-6 col-xl-12">
                                <article className="article-horizontal d-flex align-items-center gap-4 p-4 rounded-3">
                                    <div className="thumbnail flex-shrink-0 overflow-hidden rounded-3">
                                        <a href="#">
                                            <img src="/img/blog/blog-thumb-md-1.jpg" alt="not found" className="img-fluid" />
                                        </a>
                                    </div>
                                    <div className="article-contents">
                                        <div className="blog-meta d-flex align-items-center gap-3 flex-wrap mb-2">
                                            <span className="fw-medium fs-xs">
                                                <i className="fa-solid fa-tags me-2"></i>Organic Vegetable
                                            </span>
                                            <span className="fw-medium fs-xs">
                                                <i className="fa-regular fa-clock me-2"></i>May 24, 2022
                                            </span>
                                        </div>
                                        <a href="#">
                                            <h4 className="mb-2">Perfect Quality Reasonable Price For Your Family</h4>
                                        </a>
                                        <p className="mb-3">Assertively target market lorem ipsum is onsectetur noted et dolore.</p>
                                        <a href="#" className="explore-btn fw-bold">Explore More
                                            <span className="ms-2"><i className="fas fa-arrow-right"></i></span>
                                        </a>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6 col-xl-12">
                                <article className="article-horizontal d-flex align-items-center gap-4 p-4 rounded-3">
                                    <div className="thumbnail flex-shrink-0 overflow-hidden rounded-3">
                                        <a href="#">
                                            <img src="/img/blog/blog-thumb-md-2.jpg" alt="not found" className="img-fluid" />
                                        </a>
                                    </div>
                                    <div className="article-contents">
                                        <div className="blog-meta d-flex align-items-center gap-3 flex-wrap mb-2">
                                            <span className="fw-medium fs-xs">
                                                <i className="fa-solid fa-tags me-2"></i>Organic Vegetable
                                            </span>
                                            <span className="fw-medium fs-xs">
                                                <i className="fa-regular fa-clock me-2"></i>May 24, 2022
                                            </span>
                                        </div>
                                        <a href="#">
                                            <h4 className="mb-2">The Best Great Benefits Of Fresh Beef For Women's Health</h4>
                                        </a>
                                        <p className="mb-3">Assertively target market lorem ipsum is onsectetur noted et dolore.</p>
                                        <a href="#" className="explore-btn fw-bold">Explore More
                                            <span className="ms-2"><i className="fas fa-arrow-right"></i></span>
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-5">
                        <div className="linear-banner position-relative overflow-hidden z-1 rounded-3 text-center" style={{ backgroundImage: "url('/img/banner/banner-6.jpg')" }}>
                            <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mb-2">
                                <span className="text-secondary fw-medium fs-xs">
                                    <i className="fa-solid fa-tags me-2"></i>Organic Vegetable
                                </span>
                                <span className="text-secondary fw-medium fs-xs">
                                    <i className="fa-regular fa-clock me-2"></i>Organic Vegetable
                                </span>
                            </div>
                            <h4 className="text-white mb-5">Holiday Home Delivery We have Recently Ordered Organic Vegetable</h4>
                            <a href="#" className="btn btn-primary rounded-1 btn-md">Explore More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
};

export default BlogGridTop
