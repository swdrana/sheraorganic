"use client";
const VariantList = ({
  att,
  option,
  variants,
  setValue,
  varTitle,
  selectVariant,
  setSelectVariant,
  setSelectVa,
}) => {
  const handleChangeVariant = (v) => {
    setValue(v);
    setSelectVariant({
      ...selectVariant,
      [att]: v,
    });
    setSelectVa({ [att]: v });
  };

  // console.log("variants in variants list..", variants);

  return (
    <>
      {option === "Dropdown" ? (
        <select
          onChange={(e) => handleChangeVariant(e.target.value)}
          className="form-select w-50 px-2 py-1 form-control"
          name="parent"
        >
          {[
            ...new Map(
              variants.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map(
              (vl, i) =>
                Object?.values(selectVariant).includes(vl[att]) &&
                varTitle.map((vr) =>
                  vr?.variants?.map(
                    (el) =>
                      vr?._id === att &&
                      el?._id === vl[att] && (
                        <option
                          key={i + 1}
                          value={selectVariant[att]}
                          defaultValue={selectVariant[att]}
                          hidden
                        >
                          {el.name}
                        </option>
                      )
                  )
                )
            )}

          {[
            ...new Map(
              variants.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map((vl, i) =>
              varTitle.map((vr) =>
                vr?.variants?.map(
                  (el) =>
                    vr?._id === att &&
                    el?._id === vl[att] && (
                      <option key={el._id} value={vl[att]} defaultValue>
                        {el.name}
                      </option>
                    )
                )
              )
            )}
        </select>
      ) : (
        <div className="d-flex align-items-center">
          {[
            ...new Map(
              variants?.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map((vl, i) =>
              varTitle.map((vr) =>
                vr?.variants?.map(
                  (el) =>
                    vr?._id === att &&
                    el?._id === vl[att] && (
                      <button
                        onClick={(e) => handleChangeVariant(vl[att])}
                        key={i + 1}
                        className={`${
                          Object?.values(selectVariant).includes(vl[att])
                            ? "btn btn-success text-white mr-2 mb-2 rounded-pill px-3 py-1 btn-sm"
                            : "btn !bg-slate-100 text-dark mr-2 mb-2 rounded-pill px-3 py-1 btn-sm"
                        }`}
                      >
                        {el.name}
                      </button>
                    )
                )
              )
            )}
        </div>
      )}
    </>
  );
};

export default VariantList;
