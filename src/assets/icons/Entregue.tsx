

interface FILL {
  fill: boolean
}

const active = {
  margin: '10px auto',
  fill: 'var(--primary)',
};
const normal = {
  margin: '10px auto',
  fill: 'var(--secondary)',
};

export default function EntregueIcon(props: FILL) {
 
  return ( 
    <svg
      style={props.fill == true ? active : normal}
      id="_01_Icons_Line_store" data-name="01) Icons / Line /  store" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path id="store" d="M16.5,18H3.5A2.5,2.5,0,0,1,1,15.5V7.918a.891.891,0,0,0,.436.091c.089,0,.188,0,.277-.006l.081,0H1.5A1.5,1.5,0,0,1,0,6.5V5.693a1.492,1.492,0,0,1,.107-.558L2.036.315A.5.5,0,0,1,2.5,0h15a.5.5,0,0,1,.464.314l1.929,4.821A1.492,1.492,0,0,1,20,5.693V6.5a1.5,1.5,0,0,1-1.16,1.462A.385.385,0,0,0,19,7.915V15.5A2.5,2.5,0,0,1,16.5,18Zm-11-8h3A1.5,1.5,0,0,1,10,11.5V17h6.5A1.5,1.5,0,0,0,18,15.5V8.007h.52L18.6,8l-.04,0H16a1.49,1.49,0,0,1-1-.383A1.493,1.493,0,0,1,14,8H11a1.494,1.494,0,0,1-1-.383A1.49,1.49,0,0,1,9,8H6a1.49,1.49,0,0,1-1-.383A1.494,1.494,0,0,1,4,8H1.972C2,8,2,8.007,2,8.009V15.5A1.5,1.5,0,0,0,3.5,17H4V11.5A1.5,1.5,0,0,1,5.5,10Zm0,1a.5.5,0,0,0-.5.5V17H9V11.5a.5.5,0,0,0-.5-.5ZM15,5a.5.5,0,0,1,.5.5v1A.5.5,0,0,0,16,7h2.5a.5.5,0,0,0,.5-.5V5.693a.507.507,0,0,0-.036-.186L17.161,1H2.84l-1.8,4.507A.507.507,0,0,0,1,5.693V6.5a.5.5,0,0,0,.5.5H4a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,1,1,0v1A.5.5,0,0,0,6,7H9a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,1,1,0v1A.5.5,0,0,0,11,7h3a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,1,15,5Zm-.5,10h-1A1.5,1.5,0,0,1,12,13.5v-2A1.5,1.5,0,0,1,13.5,10h1A1.5,1.5,0,0,1,16,11.5v2A1.5,1.5,0,0,1,14.5,15Zm-1-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z" transform="translate(2 3)"   />
    </svg>

  );
}
