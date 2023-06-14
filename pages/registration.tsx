import { useRouter } from "next/router"
import React, { useState } from 'react';

type Props = {
  DJANGOURL:string
};

const RegistrationForm = ({DJANGOURL}:Props) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    razonSocial: '',
    dni: '',
    direccion: '',
    telefono: '',
    genero: '',
  });
  // console.log(DJANGOURL)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
const res = await fetch(DJANGOURL+"/api/auth/register/", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      })
      router.push('/')
    }
    catch(e){
      console.log(e)
    }
      

  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password1" className="block mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.password1}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="block mb-1">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.password2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="razonSocial" className="block mb-1">
            Razón Social
          </label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.razonSocial}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dni" className="block mb-1">
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.dni}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="direccion" className="block mb-1">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block mb-1">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genero" className="block mb-1">
            Género
          </label>
          <select
            id="genero"
            name="genero"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.genero}
            onChange={handleChange}
          >
            <option value="m">Masculino</option>
            <option value="f">Femenino</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm
type Params = {
  params: {
    slug: string;
  };
};


export async function getStaticProps({ params }: Params) {

  return {
    props: {
      DJANGOURL:process.env.DJANGOURL
    },
  };
}
