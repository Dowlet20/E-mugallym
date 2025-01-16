import Link from "next/link";
import React from "react";

const ShopHead = ({ shopProduct, getSelectedCourse }) => {
  return (
    <>
      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image"></div>
        <div className="rbt-banner-content">
          <div className="rbt-banner-content-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="page-list">
                    <li className="rbt-breadcrumb-item">
                      <Link href="/">Baş sahypa</Link>
                    </li>
                    <li>
                      <div className="icon-right">
                        <i className="feather-chevron-right"></i>
                      </div>
                    </li>
                    <li className="rbt-breadcrumb-item active">eKitaphana</li>
                  </ul>

                  <div className=" title-wrapper">
                    <h1 className="title mb--0">eKitaphana</h1>
                    <Link href="#" className="rbt-badge-2">
                      <div className="image">🎉</div>{/* {shopProduct.shop.length} duzetmeli */} 13
                      <span className="ms-2">Kitap</span>
                    </Link>
                  </div>

                  <p className="description">
                    Iň uly kitaphana
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rbt-course-top-wrapper mt--40">
            <div className="container">
              <div className="row g-5 align-items-center">
                <div className="col-lg-5 col-md-12">
                  <div className="rbt-sorting-list d-flex flex-wrap align-items-center">
                    <div className="rbt-short-item">
                      {/* <span className="course-index">
                        Showing 1-{getSelectedCourse.length}
                        <span className="me-2">of</span>
                        {shopProduct.shop.length} results
                      </span> duzetmeli */}
                      19 netijäniň 1-9-y görkezilýär
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-md-12">
                  <div className="rbt-sorting-list d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end">
                    <div className="rbt-short-item">
                      <div className="filter-select">
                        <span className="select-label d-block">Gysgaça</span>
                        <div className="filter-select rbt-modern-select search-by-category">
                          <select>
                            <option>Esasy kitaplar</option>
                            <option>Soňky goşulanlar</option>
                            <option>Meşhur</option>
                            <option>Trend</option>
                            <option>Bahasy: arzan-gymmat</option>
                            <option>Bahasy:gymmat-arzan</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHead;
