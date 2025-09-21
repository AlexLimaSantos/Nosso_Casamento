"use client";

export default function Login() {
  return (
    <div className="h-screen flex text-center items-center justify-center bg-[url('/images/bordas_floridas.png')] bg-no-repeat bg-cover">
        <form>
            <div>
                <h1 className="font-casamento text-5xl font-bold pb-1 pt-15 text-[#8b3443]">Álex e Isabelle</h1>
                <p className="pb-2">Nosso Grande Dia!</p>
                <img src="../images/alianças.png" alt="Alianças" className="w-auto h-15 mx-auto mb-5"/>
                <div className="flex flex-col ml-10 mr-10">
                    <label htmlFor="nome" className="font-bold text-left">Nome Completo</label>
                    <input 
                        type="text"
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-[#8b3443] mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8b3443] focus:border-transparent"
                    >
                    </input>

                    <label htmlFor="codigo" className="font-bold text-left">Código do Convite</label>
                    <input 
                        type="password"
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-[#8b3443] mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8b3443] focus:border-transparent"
                    >
                    </input>

                    <button
                    type="submit"
                    className="mt-2 bg-[#8b3443] text-white font-bold py-2 px-4 rounded hover:bg-[#a0525d] hover:scale-105 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center transition duration-200"
                    >
                        Entrar na Celebração
                    </button>
                    <p className="mt-5 font-bold">Acesso exclusivo para convidados</p>
                </div>
            </div>
        </form>
    </div>
  );
}
