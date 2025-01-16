import Link from "next/link";

const CategoryBanner = ({ category }) => {
  return (
    <>
      <div className="rbt-banner-content-top">
        <div className="container">
          {category && (
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
                  <li className="rbt-breadcrumb-item active">
                    {category && category.category
                      ? category.category
                      : "Ähli kurslar"}
                  </li>
                </ul>
                <div className=" title-wrapper">
                  <h1 className="title mb--0">
                    {category && category.category
                      ? category.category
                      : "Ähli kurslar"}
                  </h1>
                  <Link href="#" className="rbt-badge-2">
                    <div className="image">🎉</div>
                    {category && category.id} {/*category.length*/} 13 kurslar
                  </Link>
                </div>
                <p className="description">
                  {category && category.desc
                    ? category.desc
                    : "Maglumat portaly bu - web sahypasynyň we mobil (ykjam) programmanyň üsti bilen wideo sapaklary, maglumatlary we salgylanmalary (sprawoçnik) görkezýän anyk kesgitlenen web çeşmesi."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryBanner;
