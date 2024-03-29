interface propsSearch {
  color?: string;
}

export default function Search(props: propsSearch) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.979"
      height="19.564"
      viewBox="0 0 19.979 19.564"
    >
      <g
        id="Grupo_7498"
        data-name="Grupo 7498"
        transform="translate(-234 -759.25)"
      >
        <g
          id="Caminho_6330"
          data-name="Caminho 6330"
          transform="translate(234 759.25)"
          fill="#fff"
        >
          <path
            d="M 8.453807830810547 16.20761871337891 C 4.178338050842285 16.20761871337891 0.6999978423118591 12.72927761077881 0.6999978423118591 8.453807830810547 C 0.6999978423118591 4.178338050842285 4.178338050842285 0.6999978423118591 8.453807830810547 0.6999978423118591 C 12.72927761077881 0.6999978423118591 16.20761871337891 4.178338050842285 16.20761871337891 8.453807830810547 C 16.20761871337891 12.72927761077881 12.72927761077881 16.20761871337891 8.453807830810547 16.20761871337891 Z"
            stroke="none"
          />
          <path
            d="M 8.453807830810547 1.399997711181641 C 4.564328193664551 1.399997711181641 1.399997711181641 4.564328193664551 1.399997711181641 8.453807830810547 C 1.399997711181641 12.34328842163086 4.564328193664551 15.50761795043945 8.453807830810547 15.50761795043945 C 12.34328842163086 15.50761795043945 15.50761795043945 12.34328842163086 15.50761795043945 8.453807830810547 C 15.50761795043945 4.564328193664551 12.34328842163086 1.399997711181641 8.453807830810547 1.399997711181641 M 8.453807830810547 -1.9073486328125e-06 C 13.12271785736084 -1.9073486328125e-06 16.90761756896973 3.784897804260254 16.90761756896973 8.453807830810547 C 16.90761756896973 13.12271785736084 13.12271785736084 16.90761756896973 8.453807830810547 16.90761756896973 C 3.784897804260254 16.90761756896973 -1.9073486328125e-06 13.12271785736084 -1.9073486328125e-06 8.453807830810547 C -1.9073486328125e-06 3.784897804260254 3.784897804260254 -1.9073486328125e-06 8.453807830810547 -1.9073486328125e-06 Z"
            stroke="none"
            data-fill="colorize"
            fill={props.color? props.color : "#687c97"}
          />
        </g>
        <path
          id="Caminho_6329"
          data-stroke="colorize"
          data-name="Caminho 6329"
          d="M0,0,4.827,4.417"
          transform="translate(248.163 773.408)"
          fill="none"
          stroke={props.color? props.color : "#687c97"}
          stroke-linecap="round"
          stroke-width="1.4"
        />
      </g>
    </svg>
  );
}
