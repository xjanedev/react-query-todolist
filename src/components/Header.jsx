import { memo } from "react";

function Header() {
  return (
    <div className='text-gray-900 py-8 text-3xl'>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

const OptimizedHeaderComponent = memo(Header);

export default OptimizedHeaderComponent;
