 
interface FILL{
  fill: string
}

const active = {
  
  fill:  'var(--primary)',
}; 
const normal = { 
 
  fill: 'var(--secondary)',
};

export default function PedidosIcon(props:FILL) {
  return (
    
    <svg  style={active} xmlns="http://www.w3.org/2000/svg"    width="27" height="27" viewBox="0 0 27 27">
      <defs>
        <clipPath id="clip-path">
          <rect id="Retângulo_476" data-name="Retângulo 476" width="27" height="27" transform="translate(25 843)" />
        </clipPath>
      </defs>
      <g id="Grupo_de_máscara_12" data-name="Grupo de máscara 12" transform="translate(-25 -843)"  >
        <g id="_01_Icons_Line_package" data-name="01) Icons / Line /  package" transform="translate(25 843)">
          <path id="package" d="M19.687,18H2.813a.564.564,0,0,1-.563-.563V6.3L.041.772A.562.562,0,0,1,.562,0H11.813a.558.558,0,0,1,.521.353l1.728,4.32L15.79.353A.561.561,0,0,1,16.313,0h5.625a.562.562,0,0,1,.521.772L20.25,6.3V17.437A.564.564,0,0,1,19.687,18ZM14.625,6.75V16.875h4.5V6.75Zm-11.25,0V16.875H13.5V6.75ZM16.7,1.125l-1.8,4.5h4.412l1.8-4.5Zm-15.3,0,1.8,4.5H13.232l-1.8-4.5ZM11.813,15.75H8.437a.563.563,0,0,1-.562-.563v-2.25a.563.563,0,0,1,.562-.563h3.376a.563.563,0,0,1,.562.563v2.25A.563.563,0,0,1,11.813,15.75ZM9,13.5v1.125h2.25V13.5Z" transform="translate(2.25 4.5)"/>
        </g>
      </g>
    </svg>
  
  );
}
