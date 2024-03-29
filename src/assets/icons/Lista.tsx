 
interface FILL{
  fill: string
}

const active = {
  margin: '10px auto',
  fill:  'var(--primary)',
}; 
const normal = { 
  margin: '10px auto',
  fill: 'var(--secondary)',
};

export default function ListaIcon(props:FILL) {
  return (
    <svg  style={active} xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
    <g id="Group_222" data-name="Group 222" transform="translate(-40 -313)">
      <g id="Iconly_Light_outline_Document" data-name="Iconly/Light outline/Document" transform="translate(40 313)">
        <g id="Document">
          <path id="Vector" d="M12.863,0C16.059,0,17.97,1.92,18,5.132v9.659C18,18.048,16.084,20,12.863,20H5.138a6.942,6.942,0,0,1-1.171-.095l-.218-.041C1.378,19.371,0,17.555,0,14.791V5.209a7.406,7.406,0,0,1,.06-.96C.409,1.564,2.254,0,5.138,0Zm-.009,1.457H5.138c-2.456,0-3.7,1.263-3.7,3.752v9.582c0,2.489,1.245,3.752,3.7,3.752h7.716c2.455,0,3.692-1.263,3.692-3.752V5.209C16.546,2.72,15.309,1.457,12.854,1.457ZM12.593,13.51a.724.724,0,0,1,0,1.448H5.382a.724.724,0,0,1,0-1.448Zm0-4.239a.722.722,0,0,1,.691.339.745.745,0,0,1,0,.78.722.722,0,0,1-.691.339H5.382a.735.735,0,0,1,0-1.458ZM8.134,5.042a.734.734,0,0,1,0,1.457H5.391a.734.734,0,0,1,0-1.457Z" />
        </g>
      </g>
    </g>
  </svg>

  );
}
