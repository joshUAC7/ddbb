import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import {useSession} from "next-auth/react"
import { useRouter } from "next/router";
import {GetServerSideProps} from "next"
import { Carousel, Typography } from "@material-tailwind/react"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]"
// import { getServerSideProps } from "./auth/signin";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  eventos: {id:number,nombre:string,img:string,descripcion:string,catering:boolean}[];
};

export default function Home({ eventos }: Props) {
  const router = useRouter()
  const {data,status} = useSession()
 return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-semibold text-white">ARRECIFE</a>
            <div>
              { status == "authenticated" ? <a  onClick={()=>router.push('api/auth/signout')} className="text-gray-300">Cerrar Sesion</a> 
              :<>
              <a onClick={()=>router.push('registration')}  className="text-gray-300 mr-4">Registrarse</a>
              <a  onClick={()=>router.push('api/auth/signin')} className="text-gray-300">Iniciar sesión</a>
              </>
              }
            </div>
          </div>
        </div>
      </nav>
        { status == "authenticated" ?
          <div>
          ga
        </div>
        :
      <div> 
        <Carousel  autoplay transition={{ duration: 2 }} className="rounded-xl">
          {eventos.map(ele=>
          <div className="relative h-full w-full">
            <img
          src={ele.img}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              {ele.nombre}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {ele.descripcion}
            </Typography>
            </div>
            </div>
            </div>
          )}
         </Carousel>
         </div>
    }
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getServerSideProps(context:any){

  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session)
  if(session){
    console.log("EXTIOO")

    const content = await axios.get(process.env.DJANGOURL +"/logic/eventos/")
  }

  
  let data
  try {
    
  data = await axios.get(process.env.DJANGOURL +"/logic/eventos/")
  } catch (error) {
    data = {data:{}}
    
  }
  return {
  props:{
      eventos:data.data,
      DJANGOURL:process.env.DJANGOURL

  }
}
}
// export async function getStaticProps({ params }: Params) {

//   return {
//     props: {
//       DJANGOURL:process.env.DJANGOURL
//     },
//   };
// }
