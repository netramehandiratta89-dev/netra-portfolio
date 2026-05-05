import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 className="text-7xl font-black">404</h1>
        <p className="muted mt-4">That page is outside the portfolio orbit.</p>
        <Link to="/" className="button-primary mt-8">Back Home</Link>
      </div>
    </div>
  );
}
