"use client";
import { useEffect, useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import Spinner from "../../../components/ui/Spinner";
import { getObraById } from "../../../lib/obras";
import { useObraContext } from "../../../context/ObraContext";
import { useRouter } from "next/navigation";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { fetchGremios } from "../../../lib/gremios";
import Button from "../../../components/ui/Button";
import { downloadPdf } from "../../../lib/reportes";

function Reportes() {
  const { currentObraId, setCurrentObraId, setCurrentPath } = useObraContext();
  const [currentObra, setCurrentObra] = useState({});
  const [gremios, setGremios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const [selected, setSelected] = useState({ name: "Seleccione un gremio" });

  useEffect(() => {
    const loadData = async (id) => {
      const obra = await getObraById(id);
      const dataGremios = await fetchGremios();
      setCurrentObra(obra);
      setGremios(dataGremios);
      setLoading(false);
      setCurrentPath(obra.name + " > Reportes");
    };

    if (currentObraId) {
      loadData(currentObraId);
    } else {
      const pathname = window.location.pathname; // Gets the full URL path
      const parts = pathname.split("/"); // Splits the path into an array of parts
      const id = parts[parts.length - 2]; // Sets the last part
      setCurrentObraId(id);
      loadData(id);
    }
  }, []);

  const handleReturn = () => {
    router.back();
  };

  const handleCLick = async (e) => {
    e.preventDefault();
    if (selected.name !== "Seleccione un gremio") {
      setError(false);
      setLoading(true);
      setPdfUrl(await downloadPdf(currentObraId, selected.id, selected.name));
      setLoading(false);
    } else {
      setError(true);
    }
  };

  if (loading) return <Spinner />;
  else if (!currentObra)
    return <div>La obra a la que estas intentando acceder no existe</div>;

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <i
          className="bi bi-arrow-left-short text-[50px] mr-auto ml-1"
          onClick={handleReturn}
        ></i>
        <h4 className="text-center text-[15px] text-main-gray px-7">
          {currentObra.name + " > Reportes"}
        </h4>
      </div>
      <div className="px-10 py-5">
        <Listbox value={selected} onChange={(value) => setSelected(value)}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Gremio
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
              <span className="block truncate">{selected.name}</span>
            </ListboxButton>
            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {gremios.map((gremio) => (
                <ListboxOption
                  key={gremio.id}
                  value={gremio}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {gremio.name}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white"></span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        <Button text={"Generar reporte"} onClick={handleCLick} />
        {error && (
          <p className="text-[#a32f2f] font-semibold mt-3 text-center">
            No se ha seleccionado ningún gremio
          </p>
        )}
        {pdfUrl && (
          <div className="flex flex-col gap-3 items-center">
            {/* Show PDF preview */}
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              style={{ width: "100%", height: "500px" }}
            />

            {/* Button to download the PDF */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="reporte.pdf" // Default filename for download
              className="py-[10px] px-[20px] bg-[#3498db] text-[#fff] rounded font-bold no-underline "
            >
              Abrir PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(Reportes);
