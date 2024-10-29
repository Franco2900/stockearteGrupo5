import TablaInforme from "./TablaInforme";

export default function Informe({ items }) {
  return (
    <div className="mt-4 p-5 bg-primary text-white rounded justify-content-center align-items-center">
      <h1>Informe</h1>
      {items?.length ? <TablaInforme list={items} /> : <p>SIN INFORME</p>}
    </div>
  );
}