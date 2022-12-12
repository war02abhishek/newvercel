import AddCart from "../models/addCartModel.js"

export const addCart = async(req,res,next) => {
    try {

        console.log(req.body);

        var friend= {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.body.image,
            product:req.body.product ,
        }
        AddCart.update(
          { _id: req.body.user },
          { $push: { cartItems: friend } },
          done
        );
   res.status(201).json({
     success: true,
     order,
   });

        
    } catch (error) {
        console.log("Error in AddCrtController");
    }

}