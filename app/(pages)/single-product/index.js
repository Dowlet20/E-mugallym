"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ShopData from "../../../data/shop.json";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import SingleProduct from "@/components/Single-Product/SingleProduct";
import FooterOne from "@/components/Footer/Footer-One";
import axiosInstance from "@/utils/axiosInstance_library";

const SingleProductPage = ({ getParams }) => {
  const router = useRouter();
  const productId = getParams.singleId;
  const [book, setBook] = useState({});
  let getProduct;
  getProduct = JSON.parse(JSON.stringify(ShopData.shop));

  const checkMatch = getProduct.find((product) => product.id === 1);

  // useEffect(() => {
  //   if (productId && checkMatch === undefined) {
  //     router.push("/shop");
  //   }
  // }, [checkMatch, router]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const url = `/api/books/${productId}`
        const response = await axiosInstance.get(url);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[])


  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <Cart />

          <SingleProduct
            checkMatchProduct={checkMatch !== undefined ? checkMatch : ""} book={book}
          />

          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default SingleProductPage;
