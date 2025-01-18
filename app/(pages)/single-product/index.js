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
import { Ripple } from "react-css-spinners";
const SingleProductPage = ({ getParams }) => {
  const router = useRouter();
  const productId = getParams.singleId;
  const [book, setBook] = useState({});
  let getProduct;
  getProduct = JSON.parse(JSON.stringify(ShopData.shop));
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[])

  
  if (loading) {
    return (
      <div 
        className="d-flex bg-transparent"  
        style={{height: '100vh'}}
      >
        <Ripple
          color="rgba(12,235,115,1)"
          size={115}
          thickness={7}
          className="mx-auto align-self-center"
        />
      </div>
    );
  }


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
