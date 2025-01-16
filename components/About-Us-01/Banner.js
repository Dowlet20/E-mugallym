import Link from "next/link";

const Banner = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner text-center">
              <div className="section-title mb--20">
                <span className="subtitle bg-coral-opacity">Biziň işleýşimiz</span>
              </div>
              <h1 className="title display-one text-white">
                E-Mugallym web saýtyna hoş geldiňiz <br />
                Gowy okamak, gowy ýaşamak üçin iň möhüm ýörelgelerden biridir
              </h1>
              <div className="read-more-btn mt--40">
                <Link
                  className="rbt-btn btn-gradient hover-icon-reverse"
                  href="#"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Biz barada giňişleýin</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
