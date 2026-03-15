import { useEffect, useState } from "react"

export default function AttendanceList() {

  const [registros, setRegistros] = useState([])

  useEffect(() => {

  fetch("http://localhost:3000/registros")
    .then(res => res.json())
    .then(data => {
      console.log("registros:", data)
      setRegistros(data)
    })
    .catch(err => console.error(err))

}, [])

  return (

  <div className="bg-white rounded-2xl shadow-sm p-6">

    <h1 className="text-xl font-bold mb-6 text-slate-800">
      Lista de Asistentes
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {registros.map((registro) => (

        <div
          key={registro.register_id}
          className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition bg-white"
        >

          <p className="font-semibold text-slate-800 mb-2">
            {registro.user?.user_name}
          </p>

          <p className="text-slate-600 text-sm mb-1">
            Evento: {registro.event?.event_name}
          </p>

          <p className="text-slate-500 text-sm">
            Estado:{" "}
            <span className="font-medium text-slate-700">
              {registro.state}
            </span>
          </p>

        </div>

      ))}

    </div>

  </div>
  )
}