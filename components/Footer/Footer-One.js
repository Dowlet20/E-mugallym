import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo/logo.png";
import logoLight from "../../public/images/dark/logo/logo-light.png";

import CopyRight from "./CopyRight";

import FooterData from "../../data/footer.json";
import SingleFooter from "./FooterProps/SingleFooter";
import { useAppContext } from "@/context/Context";

const FooterOne = ({ bgColor }) => {
  const { isLightTheme } = useAppContext();
  return (
    <>
      <footer
        className={`rbt-footer footer-style-1 ${
          bgColor ? bgColor : "bg-color-white"
        } overflow-hidden`}
      >
        <div className="footer-top">
          <div className="container">
            {FooterData &&
              FooterData.footerTwo.map((footer, index) => (
                <div className="row g-5 justify-content-around" key={index}>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="footer-widget">
                      <div className="logo">
                        <Link href="/">
                          {isLightTheme ? (
                            <Image
                              src={logo}
                              width={152}
                              height={50}
                              priority={true}
                              alt="Education Logo Images"
                            />
                          ) : (
                            <Image
                              src={logoLight}
                              width={152}
                              height={50}
                              priority={true}
                              alt="Education Logo Images"
                            />
                          )}
                        </Link>
                      </div>

                      <p className="description mt--20">{footer.description}</p>

                      <ul className="social-icon social-default justify-content-start">
                        {footer.socialLink.map((value, innerIndex) => (
                          <li key={innerIndex}>
                            <Link href={value.link}>
                              <i className={value.icon}></i>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <div className="contact-btn mt--30">
                        <Link
                          className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                          href="#"
                        >
                          <div className="icon-reverse-wrapper">
                            <span className="btn-text">Biz bilen habarlaşyň</span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* <SingleFooter
                    classOne="col-lg-2 col-md-6 col-sm-6 col-12 mt--30"
                    title="Useful Links"
                    footerType={footer.usefulLinks}
                  /> */}
                  <SingleFooter
                    classOne="col-lg-2 col-md-6 col-sm-6 col-12"
                    title="Biziň kompaniýamyz"
                    footerType={footer.ourCompany}
                  />

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="footer-widget">
                      <h5 className="ft-title">Habarlaşmak üçin</h5>
                      <ul className="ft-link">
                        <li>
                          <span>Faks: </span>
                          <Link href="#">{footer.phone}</Link>
                        </li>
                        <li>
                          <span>E-mail:</span>
                          <Link href="mailto:hr@example.com">
                            {footer.mail}
                          </Link>
                        </li>
                      </ul>

                      <form className="newsletter-form mt--20" action="#">
                        <p className="description">{footer.descriptionTwo}</p>

                        <div className="form-group right-icon icon-email mb--20">
                          <input
                            id="email"
                            type="email"
                            placeholder="E-poçtaňyzy giriziň"
                          />
                        </div>

                        <div className="form-group mb--0">
                          <button
                            className="rbt-btn rbt-switch-btn btn-gradient radius-round btn-sm"
                            type="submit"
                          >
                            <span data-text="Submit Now">Ugradyň</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <CopyRight />
      </footer>
    </>
  );
};

export default FooterOne;
