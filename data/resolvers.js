import { reject } from "lodash";
import { Widgets } from "./dbConnectors";

const resolvers = {
  getProduct: ({ id }) => {
    return Widgets.findById({ _id: id })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log("Failed to query db", err);
      });
  },
  getAllProducts: () => {
    return Widgets.find({})
      .then((res) => {
        return res;
      })
      .catch(() => {
        throw new Error("Error getting all products");
      });
  },
  createProduct: ({ input }) => {
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });
    newWidget.id = newWidget._id;
    return newWidget
      .save()
      .then(() => {
        return newWidget;
      })
      .catch((err) => {
        console.log("error saving to db", err);
      });
  },
  updateProduct: ({ input }) => {
    return Widgets.findOneAndUpdate({ _id: input.id }, input, { new: true })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log("Error while updating", err);
      });
  },
  deleteProduct: ({ id }) => {
    Widgets.findByIdAndDelete({ _id: id })
      .then((prod) => {
        return "Successfully deleted product";
      })
      .catch((err) => {
        console.log("Error removing data");
      });
  },
};
export default resolvers;
