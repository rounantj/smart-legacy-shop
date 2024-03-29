
 
interface FILL{
  fill: boolean
}
const active = {
  margin: '10px auto',
  fill:  'var(--primary)',
}; 
const normal = { 
  margin: '10px auto',
  fill: 'var(--secondary)',
};

export default function SeparacaoIcon(props:FILL) {
 
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    style={props.fill  == true ? active : normal}   
    width="35" height="35" viewBox="0 0 22.638 24.769">
    <defs></defs>
    <g transform="translate(0 0)">
       <path 
      d="M8.592,9.532c.145-.084-.161-.551-.017-.468l.056.033c.122-.936.267-1.913.444-2.858A1.787,1.787,0,0,1,10.83,4.793h.781A2.339,2.339,0,0,1,13.7,6.1l.533-1.469a.468.468,0,0,1,.182-.229V2.922a.468.468,0,0,1,.468-.468h4.21a.468.468,0,0,1,.468.468V4.405a.468.468,0,0,1,.182.229l1.193,3.274a.379.379,0,0,1,.028.159l-.028,1.558L21.2,9.5a.437.437,0,0,1,.669.407c4.663.936-7.713.253-13.519.033A.468.468,0,0,1,8.592,9.532Zm4.422-2.4a1.4,1.4,0,0,0-1.4-1.4H10.83A.847.847,0,0,0,10,6.421c-.2,1.057-.365,2.133-.468,3.2l.87.524a.468.468,0,0,0,.524-.028l.831-.182c.376-.28.818-.775,1.26-.617ZM18.627,3.39H15.353v.936h3.274Zm.351,1.871H15L14.151,7.6h5.678Zm1.052,4.21V8.535H13.95v1.4h0l.243.182a.468.468,0,0,0,.524.028l1.27-.4a1.247,1.247,0,0,1,1.47,0l.946.368a.468.468,0,0,0,.561,0L20.058,9.6A.44.44,0,0,1,20.03,9.471Z" transform="translate(-2.872 -2.455)"></path>
       <g transform="translate(0 2.131)">
          <path 
        d="M14.149,16.979a1.886,1.886,0,1,1,1.886-1.886A1.889,1.889,0,0,1,14.149,16.979Zm0-2.83a.943.943,0,1,0,.943.943A.944.944,0,0,0,14.149,14.149ZM5.66,16.979a1.886,1.886,0,1,1,1.886-1.886A1.889,1.889,0,0,1,5.66,16.979Zm0-2.83a.943.943,0,1,0,.943.943A.944.944,0,0,0,5.66,14.149Zm10.847-1.887H5.842a2.35,2.35,0,0,1-2.326-1.97L3.309,9.047l0-.009V9.031L2.155,2.126A1.411,1.411,0,0,0,.759.943H.472A.472.472,0,1,1,.472,0H.761A2.366,2.366,0,0,1,3.071,1.886H18.394a.472.472,0,0,1,.452.6L16.96,9.09a.474.474,0,0,1-.453.342H4.33l.118.7a1.409,1.409,0,0,0,1.394,1.182H16.507a.472.472,0,1,1,0,.943ZM3.229,2.83l.944,5.66H16.152l1.616-5.66Z" transform="translate(1.887 2.83)"></path>
       </g>
    </g>
 </svg>
  );
}
