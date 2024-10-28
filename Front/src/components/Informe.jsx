export default function Informe(item){
    return (
      <>
        <div className="mt-4 p-5 bg-primary text-white rounded">
          <h1>Informe</h1>
          <p>{JSON.stringify(item)}</p>
        </div>
      </>
    );
}