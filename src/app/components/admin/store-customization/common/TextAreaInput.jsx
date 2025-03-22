import FormError from "../../form/FromError";

const TextAreaInput = ({register,name,placeholder,errors,errorMessage}) => {
  return (
    <>
        <div className="col-span-12 xl:col-span-10">
                                <textarea  className="w-full min-h-32 rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none" placeholder={placeholder}  {...register(`${name}`, { required: `${errorMessage}`  })}/>
                                <FormError errors={errors} errorName={name} />
                            </div>
    </>
  )
};

export default TextAreaInput
