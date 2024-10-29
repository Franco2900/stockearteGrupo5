import { Button} from 'react-bootstrap';
export default function ErrorPage() {
  return (
    <div className="rounded justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 112px)' }}>
      <h1>Halgo salio mal...</h1>
      <Button variant="primary" href="/">VOLVER</Button>
    </div>
  );
};