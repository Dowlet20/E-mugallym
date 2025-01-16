import React from "react";

const AdditionalForm = () => {
  return (
    <>
      <div
        id="accCollapseSix"
        className="accordion-collapse collapse"
        aria-labelledby="accSix"
        data-bs-parent="#tutionaccordionExamplea1"
      >
        <div className="accordion-body card-body rbt-course-field-wrapper rbt-default-form row row-15">
          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="startDate">Başlaýan wagty</label>
              <input type="date" id="startDate" name="startDate" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="language">Dili</label>
              <div className="rbt-modern-select bg-transparent height-50 mb--10">
                <select className="w-100" id="language">
                  <option>Türkmen</option>
                  <option>Русский</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="whatLearn">Gerekli</label>
              <textarea
                id="whatLearn"
                rows="5"
                placeholder="Kursyň peýdalaryny goşuň."
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> Her setirini aýratyn ýazyň.
              </small>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="description">Düşündiriliş</label>
              <textarea
                id="description"
                rows="5"
                placeholder="Kursyň peýdalaryny goşuň."
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> 
                Her setirini aýratyn ýazyň.
              </small>
            </div>
          </div>

          <div className="col-lg-12">
            <hr className="mt--10 mb--20" />
          </div>

          <div className="col-lg-12">
            <div className="course-field mb--15">
              <label>Kursyň doly wagty</label>
              <div className="row row--15">
                <div className="col-lg-6">
                  <input type="number" placeholder="00" />
                  <small className="d-block mt_dec--5">
                    <i className="feather-info"></i> Sagat.
                  </small>
                </div>
                <div className="col-lg-6">
                  <input type="number" placeholder="00" />
                  <small className="d-block mt_dec--5">
                    <i className="feather-info"></i> Minut.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <hr className="mt--10 mb--20" />
          </div>

          <div className="col-lg-12">
            <div className="course-field mb--15">
              <label htmlFor="courseTag">Kursyň tegleri</label>
              <textarea
                id="courseTag"
                rows="5"
                placeholder="Kursyň teglerini goşuň."
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> Funksiýany, ulanylyşy we stili öz içine alýan iň köp 15 açar söz. Açar sözler kiçi harplar bilen ýazylmaly we vergul bilen bölünmeli. mysal üçin surat, galereýa, döwrebap, jquery, WordPress mowzugy
              </small>
            </div>
          </div>

          <div className="col-lg-12">
            <hr className="mt--10 mb--20" />
          </div>

          <div className="col-lg-12">
            <div className="course-field mb--15">
              <label htmlFor="targeted">Maksatly tomaşaçy</label>
              <textarea
                id="targeted"
                rows="5"
                placeholder="Kurs belligiňizi şu ýere goşuň."
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> Kursdan has köp peýdalanjak maksatly diňleýjini kesgitläň.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalForm;
