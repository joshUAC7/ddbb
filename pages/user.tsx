import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Carousel, ListItemSuffix, Typography } from "@material-tailwind/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import {
  List,
  ListItem,
  Card,
  Drawer,
  Button,
  IconButton,
  Input,
  Checkbox,Select, Option 
} from "@material-tailwind/react";
import React, { FormEvent, FormEventHandler, useState } from "react";
// import { getServerSideProps } from "./auth/signin";
const inter = Inter({ subsets: ["latin"] });

interface Reservas {
  id: number;
  fecha: string;
  costo: string;
  descuento: string;
  evento: {
    id: number;
    nombre: string;
    img: string;
    descripcion: string;
    catering: boolean;
  };
  lugar: string;
  cantidadInvitados: string;
  cantidadMesas: string;
  cantidadPersonal: string;
  pago: {
    tipoPago: string;
    fechaInicial: string;
    estado: boolean;
    monto: number;
  }[];
}
type Props = {
  eventos: {
    id: number;
    nombre: string;
    img: string;
    descripcion: string;
    catering: boolean;
  }[];
  DJANGOURL: string;
  content: {
    Eventos: any;
    Reservas: Reservas[];
  };
};

export default function HomeUser({ content, eventos, DJANGOURL }: Props) {
  const router = useRouter();
  const { data, status } = useSession();
  // const content = await axios.get(DJANGOURL+ "/logic/content/")
  // console.log(content)

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {
    setOpen(false)
    setAdder(false)
  }
  const [adder,setAdder] = useState(false)
  const [con, setCon] = useState<Reservas>({
      fecha: "",
      costo: "",
      lugar: "",
      cantidadInvitados: "0",
      cantidadMesas: "0",
      cantidadPersonal: "0",
      id: 0,
      descuento: "0",
      pago: [],
      evento: { id: 0, nombre: "", img: "", descripcion: "", catering: false },
    });

  const Clicker = (param: Reservas) => {
    openDrawer();
    setCon(param);
  };
  const Adder = () => {
    // setNull(myObj);
    // console.log(myObj);
    openDrawer();
    setCon({
      fecha: "",
      costo: "",
      lugar: "",
      cantidadInvitados: "0",
      cantidadMesas: "0",
      cantidadPersonal: "0",
      id: 0,
      descuento: "0",
      pago: [],
      evento: { id: 0, nombre: "", img: "", descripcion: "", catering: false },
    });
    setAdder(true)
  };

  const Mandar = (event: FormEventHandler<HTMLButtonElement>) => {
    console.log(event);
  };
  const handleChange = (target:string,value:string,helper=false) => {
    setCon({
      ...con,
      [target]:helper?eventos.filter(ele=> ele.nombre == value)[0]:value,
    });
    // console.log(e.target)
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(e);
    //     try{
    // const res = await fetch(DJANGOURL+"/api/auth/register/", {
    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //     headers: { "Content-Type": "application/json" }
    //   })
    //   router.push('/')
    // }
    // catch(e){
    //   console.log(e)
    // }
 
  };

  return (
    <div>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-semibold text-white">
              ARRECIFE
            </a>
            <div>
              <a
                onClick={() => router.push("api/auth/signout")}
                className="text-gray-300"
              >
                Cerrar Sesion
              </a>
            </div>
          </div>
        </div>
      </nav>
      <React.Fragment>
        <Drawer open={open} onClose={closeDrawer} className="p-4" size={900}>
          {/* <div className="mb-6 flex items-center justify-between"> */}
          {/*   <Typography variant="h5" color="blue-gray"> */}
          {/*     Reserva {con.id} */}
          {/*   </Typography> */}
          {/*   <IconButton variant="text" color="blue-gray" onClick={closeDrawer}> */}
          {/*   </IconButton> */}
          {/* </div> */}
          {/* <Typography color="gray" className="mb-8 pr-4 font-normal"> */}
          {/*   Material Tailwind features multiple React and HTML components, all */}
          {/*   written with Tailwind CSS classes and Material Design guidelines. */}
          {/* </Typography> */}
          {/* <div className="flex gap-2"> */}
          {/*   <Button size="sm">Get Started</Button> */}
          {/*   <Button size="sm" variant="outlined"> */}
          {/*     Documentation */}
          {/*   </Button> */}
          {/* </div> */}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Reserva {con.id}
            </Typography>

            <Typography color="gray" className="mt-1 font-normal">
              Datos
            </Typography>
            {!adder ? (
              <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSubmit}
              >
                <div
                  className={`mb-4 flex flex-col gap-6 ${
                    con.fecha !== "" ? "myRule " : ""
                  }`}
                >
                  <Input size="lg" label="fecha" value={con.fecha} />
                  <Input size="lg" label="costo" name="costo" value={con.costo} />
                  <Input size="lg" label="lugar" value={con.lugar}  />
                  <Input
                    size="lg"
                    label="Tipo Evento"
                    value={con.evento.nombre}
                  />
                  <Input
                    size="lg"
                    label="Cantidad Invitados"
                    value={con.cantidadInvitados}
                  />
                  <Input
                    size="lg"
                    label="Cantidad Personal"
                    value={con.cantidadPersonal}
                  />
                  <Input
                    size="lg"
                    label="Cantidad Mesas"
                    value={con.cantidadMesas}
                  />
                </div>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                ></Typography>
              </form>
            ) : (
              <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSubmit}
              >
                <div className={`mb-4 flex flex-col gap-6 `}>
                  <Input size="lg" label="fecha" value={con.fecha}  onChange={e=>handleChange("fecha",e.target.value)} />
                  <Input size="lg" label="costo" value={con.costo} onChange={e=>handleChange("costo",e.target.value)} />
                  <Input size="lg" label="lugar" value={con.lugar} onChange={e=>handleChange("lugar",e.target.value)} />
                  {/* <Input */}
                  {/*   size="lg" */}
                  {/*   label="Tipo Evento" */}
                  {/*   onChange={e=>handleChange("lugar",e.target.value)} */}
                  {/* /> */}
                  <Select label="Tipo de Evento" onChange={(e)=>{handleChange("evento",e!!,true)}} >
                    { eventos.map(ele=><Option value={ele.nombre}>{ele.nombre}</Option>) }
      </Select>
                  <Input
                    size="lg"
                    label="Cantidad Invitados"
                    value={con.cantidadInvitados}
                    onChange={e=>handleChange("cantidadInvitados",e.target.value)}
                  />
                  <Input
                    size="lg"
                    label="Cantidad Personal"
                    value={con.cantidadPersonal}
                    onChange={e=>handleChange("cantidadPersonal",e.target.value)}
                  />
                  <Input
                    size="lg"
                    label="Cantidad Mesas"
                    value={con.cantidadMesas}
                    onChange={e=>handleChange("cantidadMesas",e.target.value)}
                  />
                </div>
                <Button className="mt-6" fullWidth type="submit">
                  Hacer Reserva
                </Button>

                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                ></Typography>
              </form>
            )}
          </Card>
        </Drawer>
      </React.Fragment>

      <Card className="w-96">
        <List>
          {content.Reservas.map((ele) => (
            <ListItem onClick={() => Clicker(ele)}>
              {" "}
              <div>
                <Typography variant="h6" color="blue-gray">
                  Reserva {ele.evento.nombre}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {ele.lugar} {ele.fecha}
                </Typography>
              </div>
              <ListItemSuffix>Pago</ListItemSuffix>
            </ListItem>
          ))}
        </List>
      </Card>
      <Button color="green" onClick={() => Adder()}>
        color green
      </Button>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getServerSideProps(context: any) {
          let data;
        try {
          data = await axios.get(process.env.DJANGOURL + "/logic/eventos/");
  } catch (error) {
          data = { data: {} };
  }
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  let content;
  if (session) {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    };

    const content = await axios.get(
      process.env.DJANGOURL + "/logic/content/",
      {
        headers,
      }
    );
    console.log(content.data);
    return {
      props: {
        eventos: data.data,
        DJANGOURL: process.env.DJANGOURL,
        content: content.data,
      },
    };
  }
  return {
    props: {
      // eventos: data.data,
      DJANGOURL: process.env.DJANGOURL,
    },
  };
}
// export async function getStaticProps({ params }: Params) {

//   return {
//     props: {
//       DJANGOURL:process.env.DJANGOURL
//     },
//   };
// }
