"use server";
import connectDB from "@/app/utils/database";
import Attribute from "../model/attributes.model";

// add attribute value
export async function addChildAttributeValue(attributeId, attributeValue) {
  connectDB();

  // console.log("attributeId", attributeId, "attributeValue", attributeValue);
  try {
    const attribute = await Attribute.findById(attributeId);
    const res = await Attribute.updateOne(
      { _id: attribute._id },
      { $push: { variants: attributeValue } }
    );

    // await handleProductAttribute(attributeId, childId);
    // console.log("res..in child attribute delet", res);
    return res;
  } catch (err) {
    console.log("error.... in attribute action", err);
    return err;
  }
}

// delete child attribute
export async function deleteChildAttribute(attributeId, childId) {
  connectDB();
  try {
    const res = await Attribute.updateOne(
      { _id: attributeId },
      { $pull: { variants: { _id: childId } } }
    );

    // await handleProductAttribute(attributeId, childId);
    // console.log("res..in child attribute delet", res);
    return res;
  } catch (err) {
    return err;
  }
}

// update attribute value and status
export async function updateChildAttributes(attributeId, childId, updateData) {
  connectDB();
  try {
    let attribute = await Attribute.findOne({
      _id: attributeId,
      "variants._id": childId,
    });

    if (attribute) {
      attribute.variants.find((v) => v._id.toString() === childId);

      // const name = {
      //   ...att.name,
      //   ...req.body.name,
      // };

      const res = await Attribute.updateOne(
        { _id: attributeId, "variants._id": childId },
        {
          $set: {
            "variants.$.name": updateData.name,
            "variants.$.status": updateData.status,
          },
        }
      );
      return res;
    }
  } catch (err) {
    // res.status(500).json({
    //   message: err.message,
    // });
    console.log("err in child att update", err);
  }
}

// // update attribute  status
export async function updateChildAttributesStatus(
  attributeId,
  childId,
  updateStatus
) {
  connectDB();
  // console.log(
  //   "attributeid",
  //   attributeId,
  //   "childId",
  //   childId,
  //   "update status",
  //   updateStatus
  // );
  try {
    let attribute = await Attribute.findOne({
      _id: attributeId,
      "variants._id": childId,
    });

    if (attribute) {
      // const att = attribute.variants.find((v) => v._id.toString() === childId);

      // const name = {
      //   ...att.name,
      //   ...req.body.name,
      // };

      const res = await Attribute.updateOne(
        { _id: attributeId, "variants._id": childId },
        {
          $set: {
            "variants.$.status": updateStatus.status,
          },
        }
      );
      return res;
    }
  } catch (err) {
    // res.status(500).json({
    //   message: err.message,
    // });
    console.log("err in child att update", err);
  }
}
