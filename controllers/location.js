import mongoose from "mongoose";
import Location from "../models/Location.js";

export const getLocation = (req, res, next) => {
  Location.find()
    .select("locationName _id locationImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        locations: docs.map((doc) => {
          return {
            locationName: doc.locationName,
            locationImage: doc.locationImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8800/api/locations/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const createLocation = (req, res, next) => {
  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    locationName: req.body.locationName,
    locationImage: req.file.path,
  });

  location
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          locationName: result.locationName,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8800/api/locations/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const getSpecificLocation = (req, res, next) => {
  const id = req.params.productId;
  Location.findById(id)
    .select("locationName _id locationImage")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          location: doc,
          request: {
            type: "GET",
            url: "http://localhost:8800/api/locations",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const updateLocation = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Location.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const deleteLocation = (req, res, next) => {
  const id = req.params.productId;
  Location.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
