"use client";
import Multiselect from "multiselect-react-dropdown";
import Tree from "rc-tree";
import { toast } from "react-toastify";

const ParentCategory = ({
  selectedCategory,
  setSelectedCategory,
  setDefaultCategory,
  categoryList,
}) => {
  //   const { data, loading } = useAsync(CategoryServices?.getAllCategory);
  //   const { showingTranslateValue } = useUtilsFunction();

  const STYLE = `
  .rc-tree-child-tree {
    display: block;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: () => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: category.name,
        key: category._id,
        children:
          category?.children?.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  const handleSelect = (key) => {
    const obj = categoryList[0];
    const result = findObject(obj, key);

    if (result !== undefined) {
      const getCategory = selectedCategory.filter(
        (value) => value._id === result._id
      );

      if (getCategory.length !== 0) {
        return toast.error("This category already selected!");
      }

      setSelectedCategory((pre) => [
        ...pre,
        {
          _id: result?._id,
          name: result?.name,
        },
      ]);
      setDefaultCategory(() => [
        {
          _id: result?._id,
          name: result?.name,
        },
      ]);
    }
  };

  const handleRemove = (v) => {
    setSelectedCategory(v);
  };

  return (
    <>
      <div className="mb-2">
        <Multiselect
          displayValue="name"
          groupBy="name"
          isObject={true}
          hidePlaceholder={true}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={(v) => handleRemove(v)}
          onSearch={function noRefCheck() {}}
          onSelect={(v) => handleSelect(v)}
          // options={selectedCategory}
          selectedValues={selectedCategory}
          placeholder={"Select Category"}
        ></Multiselect>
      </div>

      {/* {!loading && data !== undefined && ( */}
      {categoryList && (
        <div className="draggable-demo capitalize">
          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
          <Tree
            expandAction="click"
            treeData={renderCategories(categoryList)}
            // defaultCheckedKeys={id}
            onSelect={(v) => handleSelect(v[0])}
            motion={motion}
            animation="slide-up"
          />
        </div>
      )}
    </>
  );
};

export default ParentCategory;
