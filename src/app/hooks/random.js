export const readyToParentAndChildrenCategory = (
  categories,
  parentId = null
) => {
  const categoryList = [];
  let Categories;
  if (parentId == null) {
    Categories = categories?.filter((cat) => cat.parentId == undefined);
  } else {
    Categories = categories?.filter((cat) => cat.parentId == parentId);
  }

  if (Categories) {
    for (let cate of Categories) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        parentName: cate.parentName,
        description: cate.description,
        icon: cate.icon,
        status: cate.status,
        children: readyToParentAndChildrenCategory(categories, cate._id),
      });
    }
  }

  return categoryList;
};
