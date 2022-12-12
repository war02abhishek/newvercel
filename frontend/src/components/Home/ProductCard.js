import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    readOnly: true,
    value: product.ratings,
    precision: 0.5,
  };
  console.log(product);
  // console.log(product.image[0].url);
  console.log("chanege");
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={
          product.image[0]?.url
            ? product.image[0].url
            : "https://media-exp1.licdn.com/dms/image/C5603AQEh_hEtYHULMw/profile-displayphoto-shrink_200_200/0/1643797504131?e=2147483647&v=beta&t=FaGKSvlgtX-n3K5hjy0x3Rt190SG_M_oTmnZRXRoOPM"
        }
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">{product.numOfReviews}Reviews</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
