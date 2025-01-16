import CountDown from "@/components/Maintenance/CountDonw";

const MaintenancePage = () => {
  return (
    <>
      <div
        className="rbt-countdown-area rbt-maintenance-area bg_image bg_image--6 bg_image_fixed rbt-section-gap vh-100 d-flex align-items-center justify-content-center"
        data-black-overlay="5"
      >
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">
              <div className="inner">
                <div className="section-title text-center">
                  <span className="subtitle bg-white-opacity">
                    Ätiýaçlyk işleri üçin elýeterli däl.
                  </span>
                  <h2 className="title color-white">
                    Web saýtymyzda düzediş işleri geçirilýär!
                  </h2>
                  <p className="description has-medium-font-size mt--20 mb--0 color-white opacity-7">
                  Häzirki wagtda ätiýaçlyk işleri geçirilýär, ähli zat meýilleşdirilen ýaly bolanda, biz gaýtadan işe gireris
                  </p>
                </div>
                <div className="countdown-style-1 mt--50 justify-content-center">
                  <div
                    className="countdown justify-content-center"
                    data-date="2025-12-30"
                  >
                    <CountDown targetDate="2025-12-30" targetTime="18:00:00" />
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

export default MaintenancePage;
