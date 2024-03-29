 
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

export default function CarrinhoIcon() {
  return (

<svg xmlns="http://www.w3.org/2000/svg" style={normal} width="19.999" height="18" viewBox="0 0 19.999 18">
  <g id="Grupo_1127" data-name="Grupo 1127" transform="translate(-902 -22)">
    <g id="_01_Icons_Line_shopping-cart" data-name="01) Icons / Line /  shopping-cart" transform="translate(902 22)">
      <path id="shopping-cart" d="M15,18a2,2,0,1,1,2-2A2,2,0,0,1,15,18Zm0-3a1,1,0,1,0,1,1A1,1,0,0,0,15,15ZM6,18a2,2,0,1,1,2-2A2,2,0,0,1,6,18Zm0-3a1,1,0,1,0,1,1A1,1,0,0,0,6,15Zm11.5-2H6.194a2.492,2.492,0,0,1-2.466-2.089l-.22-1.319s0-.007,0-.01l0-.007L2.285,2.254A1.5,1.5,0,0,0,.8,1H.5a.5.5,0,1,1,0-1H.806a2.509,2.509,0,0,1,2.45,2H19.5a.5.5,0,0,1,.48.637l-2,7A.5.5,0,0,1,17.5,10H4.59l.125.747A1.494,1.494,0,0,0,6.193,12H17.5a.5.5,0,1,1,0,1ZM3.424,3l1,6h12.7l1.714-6Z" transform="translate(0)" fill="#fff"/>
    </g>
  </g>
</svg>

  );
}
