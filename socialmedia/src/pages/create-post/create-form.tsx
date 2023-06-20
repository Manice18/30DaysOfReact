import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc,collection } from "firebase/firestore";
import { db,auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFromData {
  title: string,
  description: string
}

export const CreateForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description.") 
  })

  const {register,handleSubmit,formState:{errors}} = useForm<CreateFromData>({
    resolver: yupResolver(schema)
  })

  const postsRef = collection(db,"posts");

  const onCreatePost = async (data: CreateFromData) => {
    await addDoc(postsRef,{
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input type="text" placeholder="Title..." {...register("title")} />
      <p style={{color: "red"}}>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")}/>
      <p style={{color: "red"}}>{errors.description?.message}</p>
      <button type="submit" className="submitForm" >Submit</button>
    </form>
  )
};