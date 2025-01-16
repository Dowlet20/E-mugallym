"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import FooterOne from "@/components/Footer/Footer-One";
import BreadCrumb from "@/components/Common/BreadCrumb";
import PricingThree from "@/components/Pricing/Pricing-Three";
import AccordionThree from "@/components/Accordions/Accordion-Three";

const SubscriptionPage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />
          <BreadCrumb title="Abuna ýazylmak" text="Abuna ýazylmak" />

          <div className="rbt-pricing-area bg-color-white rbt-section-gap">
            <PricingThree title="" tag="" col="col-12" position="text-center" />
          </div>

          <div className="rbt-accordion-area accordion-style-1 bg-color-extra2 rbt-section-gap">
            <AccordionThree />
          </div>

          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default SubscriptionPage;
