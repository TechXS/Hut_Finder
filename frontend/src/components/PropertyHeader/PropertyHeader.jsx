import "./propertyHeader.css"
export default function HeaderAndButtonsComponent() {
  return (
    <div className='listingContainer'>
      <div className='title-bar'>
        <h2>Property Units</h2>
      </div>
      <div className="button-container">
        <button>All rooms</button>
        <button>Single room</button>
        <button>Bedsitter</button>
        <button>1 bedroom</button>
        <button>2 bedroom</button>
        <button>3 bedroom</button>
        <button>4 bedroom</button>
        <button>5 bedroom</button>
      </div>
    </div>
  );
}
