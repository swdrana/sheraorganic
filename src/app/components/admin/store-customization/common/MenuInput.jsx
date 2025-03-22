import FormError from "../../form/FromError";

const MenuInput = ({label,name,placeholder,register,errorMessage,errors}) => {
  return (
    <>
       <div className="col-span-12 md:col-span-4 xl:col-span-3">
                            <label htmlFor="ht2" className="inline-block text-gray-1 text-md font-semibold mb-2">{label}</label>
                            <input type="text" placeholder={placeholder} className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none" {...register(`${name}`, { required: `${errorMessage}`  })}></input>
                            <FormError errors={errors} errorName={name} />
                        </div>
                       
    </>
  )
};

export default MenuInput
