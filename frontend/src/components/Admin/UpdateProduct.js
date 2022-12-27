import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productActions";
import { useParams,useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";

const UpdateProduct = () => {
  
  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();
  const { id} = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [newimage, setNewimage] = useState("");
   const initialState = {
     name: "",
     price: "",
     description: "",
     category: category,
     Stock: 0,
     image: [
       {
         public_id: "sample image",
         url: newimage,
       },
     ],
   };
    const [formdata, setFormdata] = useState(initialState);
  const categories = [
    "Laptop",
    "Mobile",
    "Tablet",
    "TV",
    "Camera",
    "Speaker",
    "Headphone",
    "Attire",
    "Watch",
    "Other",
    "AC",
    "Refrigerator",
  ];


   const { product, error } = useSelector(
     (state) => state.productDetails
   );
   const {
     loading,
     isUpdated,
   } = useSelector((state) => state.product);
   console.log(id);

 useEffect(() => {
   
     dispatch(getProductDetails(id));
     
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
     if(product)
     {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
     }
    
 }, [isUpdated,dispatch]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    console.log(formdata);
    dispatch(updateProduct(id,formdata));
  };


  return (
    <>
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>Update Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              name="name"
              placeholder={product.name}
              required
              // handleChange={handleChange}
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              name="price"
              placeholder={product.price}
              required
              onChange={(e) =>
                setFormdata({ ...formdata, price: e.target.value })
              }
              // value={price}
              // onChange={(e) => setPrice(e.target.value)}
              // handleChange={handleChange}
            />
          </div>

          <div>
            <DescriptionIcon />

            <textarea
              placeholder={"description"}
              name="description"
              
              onChange={(e) =>
                setFormdata({ ...formdata, description: e.target.value })
              }
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <select
              onChange={(e) =>
                setFormdata({ ...formdata, category: e.target.value })
              }
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              name="Stock"
              placeholder={product.Stock}
              required
              onChange={(e) =>
                setFormdata({ ...formdata, Stock: e.target.value })
              }
            />
          </div>

          <div id="createProductFormFile">
            {/* <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormdata({ ...formdata, images: base64 })
                }
              /> */}
            <input
              type="text"
              name="images"
              placeholder="Image Link"
              required
              onChange={(e) =>
                // formdata.image.map(item=>{

                // })
                (formdata.image[0].url = e.target.value)
              }
            />
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct