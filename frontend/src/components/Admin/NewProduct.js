import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import FileBase from "react-file-base64";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);
   const [category, setCategory] = useState("");
     const [newimage, setNewimage] = useState(
      ""
     );
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
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
 
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [formdata,setFormdata]=useState(initialState)



  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success===true) {
      alert.success("Product Created Successfully");
      navigate("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

    const handleChange = (e) =>
      setFormdata({ ...formdata, [e.target.name]: e.target.value });


  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    console.log(formdata)
    dispatch(createProduct(formdata));
  };

//   const createProductImagesChange = (e) => {
//     const files = Array.from(e.target.files);

//     setImages([]);
//     setImagesPreview([]);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
          
//           setImages((old) => [...old, reader.result]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                name="name"
                placeholder="Productname"
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
                placeholder="Price"
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
                placeholder="Product Description"
                name="description"
                // value={description}
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
                placeholder="Stock"
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
                  formdata.image[0].url=e.target.value
                }
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
