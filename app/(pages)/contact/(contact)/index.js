"use client";

import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import Contact from "@/components/Contacts/Contact";
import ContactForm from "@/components/Contacts/Contact-Form";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import FooterOne from "@/components/Footer/Footer-One";

const ContactPage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />

          <div className="rbt-conatct-area bg-gradient-11 rbt-section-gap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb--60">
                    <span className="subtitle bg-secondary-opacity">
                      Biz bilen habarlaşmak üçin
                    </span>
                    <h2 className="title">
                      E-Mugallym Kursymyz bilen habarlaşmak üçin <br /> Bize goşul.
                    </h2>
                  </div>
                </div>
              </div>
              <Contact />
            </div>
          </div>
          <ContactForm />

          <div className="rbt-google-map bg-color-white rbt-section-gapTop">
            <iframe
              className="w-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.9838001188796!2d58.38481017644274!3d37.930808903155494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6ffde678bc37f3%3A0xcbf1a59c7a6850fa!2sMagtymguly%20adyndaky%20T%C3%BCrkmen%20d%C3%B6wlet%20uniwersiteti!5e0!3m2!1sen!2s!4v1738652209411!5m2!1sen!2s"
              height="600"
              style={{ border: "0" }}
            ></iframe>
          </div>

          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default ContactPage;
