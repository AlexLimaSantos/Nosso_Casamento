"use client";

export default function Login() {

  return (
    <div className="w-full h-screen flex text-center items-center justify-center">
        <form className="w-100 bg-green-500 flex items-center justify-center">
            <div className="bg-red-500 p-6">
                <h1 className="text-3xl font-bold pb-3">Álex e Isabelle</h1>
                <p className="pb-15">Nosso Grande Dia!</p>
                <div className="">
                    <label htmlFor="nome">Nome Completo</label>
                    <input 
                        type="text"
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    </input>

                    <label htmlFor="codigo">Código do Convite</label>
                    <input 
                        type="password"
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    </input>

                    <button
                    type="submit"
                    className="w-full bg-green-500"
                    >
                        Entrar na Celebração
                    </button>
                </div>
            </div>
        </form>
    </div>
  );
}
