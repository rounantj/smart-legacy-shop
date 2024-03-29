import React, { useEffect, useState } from "react";
import inputStyle from '@styles/components/InputText.module.css'

interface InputProps {
  label: string;
  id?: string;
  name?: string;
  type: string;
  required?: boolean;
  className?: string;
  value?: any
  focar?: any
  style?: any
  inputError?: any;
  onSubmit?: any;
  onKeyUp?: any;
  onBlur?: any;
  color?: any;
  list?: any;
  onchange?: any;
  defaultValue?: any;
  inputMode?: any
  ligado?: boolean
  maxLenght?: number

}

function InputText(props: InputProps) {
  function handleChange(e: any) {
    //console.log("handleChange",e)
    const value = e.target.value;
    let isValid = false;

    if (e.target.checkValidity) {
      // isValid = e.target.checkValidity();
    }

    props.onchange(value, isValid);
  }
  function handleBlur(e: any) {
    //console.log("handleChange",e)
    if (props.onBlur) {
      const value = e.target.value;
      let isValid = false;

      if (e.target.checkValidity) {
        // isValid = e.target.checkValidity();
      }

      props.onBlur(value, isValid);
    }
  }

  const handleKeydown = (e: any) => {
    //  console.log("handleKeydown",e)
    if (e.key == "Enter" && props.onSubmit) {
      props.onSubmit(e.nativeEvent.target.value);
    }
  }

  useEffect(() => {
    //console.log('props foi',props)
  }, [])


  return (
    <div
      style={props.style}
      className={`${props.className} ${inputStyle.inputBox} ${!props.defaultValue ? '' : inputStyle.notEmpty} ${props.inputError ? inputStyle.error : ''}`}
    >
      {
        props.focar && props.focar === true ?
          <input
            maxLength={props.maxLenght ? props.maxLenght : 9999999}
            style={props.color ? { color: props.color } : { color: 'var(--primary)' }}
            value={props.defaultValue}
            defaultValue={props.defaultValue}
            id={props.id}
            name={props.name}
            ref={input => input && input.focus()}
            type={props.type}
            required={props.required}
            onChange={props.onchange ? handleChange : () => console.log('')}
            onKeyUp={props.onKeyUp}
            onBlur={handleBlur}
            onKeyDown={handleKeydown}
            inputMode={props.inputMode}
            list={props.list}

          />
          :
          <input
            value={props.defaultValue}
            defaultValue={props.defaultValue}
            maxLength={props.maxLenght ? props.maxLenght : 9999999}
            id={props.id}
            name={props.name}
            style={props.color ? { color: props.color } : { color: 'var(--primary)' }}
            type={props.type}
            required={props.required}
            onChange={props.onchange ? handleChange : () => console.log('')}
            onKeyUp={props.onKeyUp}
            onKeyDown={handleKeydown}
            onBlur={handleBlur}
            list={props.list}
            inputMode={props.inputMode}

          />

      }


      <div className={`${inputStyle.materialBox} ${props.color ? 'errorInput' : ''}`}>
        {
          props.color ?

            props.value ?
              <div>
                {/* <label style={{ color: props.color }} htmlFor={props.id}>{props.label}</label> */}
                <fieldset style={{ border: '1px solid ' + props.color }}>
                  <legend>
                    <span>
                      {props.label}
                    </span>
                  </legend>
                </fieldset>
              </div>

              :
              <div>
                <label style={{ color: props.color }} htmlFor={props.id}>{props.label}</label>
                <fieldset style={{ border: '1px solid ' + props.color }}>
                  <legend>
                    <span>
                      {props.label}
                    </span>
                  </legend>
                </fieldset>
              </div>



            :
            props.value ?
              <div>
                {/* <label htmlFor={props.id}>{props.label}</label> */}
                <fieldset style={{ border: '1px solid ' + props.color }}>
                  <legend>
                    <span>
                      {props.label}
                    </span>
                  </legend>
                </fieldset>
              </div>

              :
              <div>
                <label htmlFor={props.id}>{props.label}</label>
                <fieldset >
                  <legend>
                    <span>
                      {props.label}
                    </span>
                  </legend>
                </fieldset>
              </div>

        }




      </div>

    </div>
  );
}


InputText.defaultProps = {
  type: 'text',
  required: false,
};

export default InputText;