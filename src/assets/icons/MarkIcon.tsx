import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

 
interface FILL{
  fill: string  
}

const active = { 
  fill:  'var(--primary)',
}; 
const normal = { 
 
  fill: '#fff',
};
const position = {
  position: 'absolute' as 'absolute',
  right: '-10px',
  top: '-10px',
  display:'none'
}
const relative = {
  position: 'relative' as 'relative',
  right: '-20px',
  top: '-20px',
  display:'none', 
 
}

 
   

export default function MarkIcon(props: FILL) {
  return (
    props.fill == 'relative'? 
     
    <svg  className="check"  xmlns="http://www.w3.org/2000/svg" style={ relative}  width="40" height="30" viewBox="0 0 31 31"  ><defs> </defs><path style={active}  d="M15.5,0a15.451,15.451,0,1,0,6.033,1.218A15.451,15.451,0,0,0,15.5,0Z"></path><g transform="translate(8.977 10.263)"><path style={normal}   d="M4.5,8.739,13.052.189a.644.644,0,1,1,.911.911l-9,9a.643.643,0,0,1-.911,0L.188,6.245A.644.644,0,1,1,1.1,5.334Z"></path>
    </g></svg>
    : 
    <svg className="check"  xmlns="http://www.w3.org/2000/svg" style={ position}  width="40" height="30" viewBox="0 0 31 31"  ><defs> </defs><path style={active}  d="M15.5,0a15.451,15.451,0,1,0,6.033,1.218A15.451,15.451,0,0,0,15.5,0Z"></path><g transform="translate(8.977 10.263)"><path style={normal}   d="M4.5,8.739,13.052.189a.644.644,0,1,1,.911.911l-9,9a.643.643,0,0,1-.911,0L.188,6.245A.644.644,0,1,1,1.1,5.334Z"></path>
</g></svg>
    


  );
}
