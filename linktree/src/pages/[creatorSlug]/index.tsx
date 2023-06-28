import { useEffect,useState } from "react"
import ImageUploading,{ ImageListType } from "react-images-uploading";
import supabase from "@/utils/supabaseClient"
import Image from "next/image";
import { useRouter } from "next/router";

interface Link {
  title: string,
  url: string
}

export default function Home() {
  const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);
  const [userId,setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string|undefined>();
  const [url, setUrl] = useState<string|undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl,setProfilePictureUrl] = useState<string | undefined>();
  const router = useRouter()

  const {creatorSlug} = router.query;
  
  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
  }

  useEffect(()=>{
    const getUser =async () => {
      const user = await supabase.auth.getUser();
      console.log("user: ",user)
      if(user.data.user){
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };
    getUser()
  },[]);

  useEffect(()=>{
    const getLinks =async () => {
      try{
        const {data,error} = await supabase
        .from("links")
        .select("title, url")
        .eq("user_id",userId)

        if(error) throw error;

        setLinks(data);
        console.log(links);

      }catch(error){
        console.log("error: ",error);
      }
    };
    if(userId){
      getLinks();
    }
  },[userId]);

  useEffect(()=>{
    const getUser =async () => {
      try {
        const {data,error} = await supabase
        .from("users")
        .select("id, profile_picture_url")
        .eq("username",creatorSlug);
          if(error) throw error;
          setProfilePictureUrl(data[0]["profile_picture_url"]);
          setUserId(data[0]["id"])
      } catch (error) {
        console.log("error: ",error)
      }
    };
    if(creatorSlug) getUser();
  },[creatorSlug])

  const addNewLink =async () => {
    try{
    if(title && url && userId){
    const {data,error} = await supabase
    .from("links")
    .insert({
      title: title,
      url: url,
      user_id: userId
    })
    .select();
    if(error) throw error;
    console.log("data: ",data);
    if(links){
    setLinks([...data, ...links])}
  }}catch(error){
    console.log(error);
  }
  };

  const uploadProfilePicture =async () => {
    try
    {
      if(images.length>0){
      const image = images[0];
      if(image.file && userId){
        const {data,error} = await supabase.storage.from("public").upload(`${userId}/${image.file.name}`,image.file, {upsert: true})
        if(error) throw error;
        const resp = supabase.storage.from("public").getPublicUrl(data.path);
        const publicUrl = resp.data.publicUrl;
        const updateUsesResponse = await supabase
        .from("users")
        .update({profile_picture_url: publicUrl})
        .eq("id",userId);

        if(updateUsesResponse.error) throw error;
      }
    }}catch(error){
      console.log("error: ",error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center w-full mt-4' >
      {profilePictureUrl && 
        <Image 
          src={profilePictureUrl}
          alt="profile_image"
          height={50}
          width={50}
          className="rounded-full"
        />
      }
      {
        links?.map((link: Link, index: number)=>(
          <div key={index}
            className="shadow-xl w-1/4 bg-indigo-500 mt-5 p-4 rounded-lg text-center text-white"
            onClick={(e)=>{
              e.preventDefault
              window.location.href = link.url
            }}
          >
            {link.title}
          </div>
        ))
      }
      {isAuthenticated &&
      <>
      <div>
        <h1>New Link Creation</h1>
        <div className="mt-4">
          <div className='block text-sm font-medium text-gray-700'>Title</div>
            <input
            type="text" name="title" id="title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text"
            placeholder='your links here'
            onChange={(e)=>setTitle(e.target.value)}
            />
        </div>
        <div className="mt-4">
          <div className='block text-sm font-medium text-gray-700'>
            URL
          </div>
            <input
            type="text" name="url" id="url"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text"
            placeholder='http://example.com'
            onChange={(e)=>setUrl(e.target.value)}
            />
        
        </div>
        <button
              type='button'
              className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4'
              onClick={addNewLink}
          >
              Add new link
          </button>
      </div>
      <div className="mt-8">
        <h1>Upload Image</h1>
        { images.length > 0 &&
          <Image
          src={images[0]["data_url"]}
          height={100}
          width={100}
          alt="profile-pic"
        />}
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
        >
          {({onImageUpload, onImageRemoveAll,isDragging,dragProps})=>(
            <div className="upload__image-wrapper bg-slate-300 p-4 text-center">
              {images.length===0?
            (<button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="w-3/4"
            >
              Click or Drop here
            </button>
            ):
            (<button onClick={onImageRemoveAll}>Remove all images</button>)}
            </div>
          )}
        </ImageUploading>
        <button
            type='button'
            className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4'
            onClick={uploadProfilePicture}
          >
              Upload Profile Picture
          </button>
      </div>
      </>
    }
    </div>
  )
}