"use client"
import FormError from "../../form/FromError";

const TextInput = ({register,name,placeholder,errors,errorMessage}) => {
  return (
    <>
      <div className="col-span-12 xl:col-span-10">
                            <input type="text" placeholder={placeholder} className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"     {...register(`${name}`, { required: `${errorMessage}`  })}
                            />
                            <FormError errors={errors} errorName={name} />
                        </div>
    </>
  )
};

export default TextInput
