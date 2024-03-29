import React, { useState, useEffect, useRef } from 'react';

interface Pro{
  changeCep: any
}
function InputMask (props: Pro) {
  const [card, setCard] = useState();
  const inputCard : any = useRef();

  const handleChange = () => {
    const cardValue = inputCard.current.value

      .replace(/\D/g, '')
      .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    inputCard.current.value = !cardValue[2]
      ? cardValue[1]
      : `${cardValue[1]}-${cardValue[2]}${`${
          cardValue[3] ? `-${cardValue[3]}` : ''
        }`}${`${cardValue[4] ? `-${cardValue[4]}` : ''}`}`;
    const numbers = inputCard.current.value.replace(/(\D)/g, '');
    setCard(numbers);
    props.changeCep(cardValue)
  };

  useEffect(() => {
    handleChange();
  }, [card]);

  return (
    <>
      <input type="text" ref={inputCard} onChange={handleChange} />
    </>
  );
};

export default InputMask;