import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

import styles from "@styles/components/PriceFilter.module.css";

interface staticProps {
  step: number;
  min: number;
  max: number;
  values: number[];
  setShow: any
}

export default function PriceFilter(props: staticProps) {
  const [values, setValues] = useState(props.values);
  const [MIN, setMIN] = useState(props.min);
  const [MAX, setMAX] = useState(props.max);

  function search(valores: number[]) {

    setValues(valores)

    props.setShow(
      '{"start":' + valores[0] + ', "end":' + (valores[1] > 5 ? valores[1] : 5) + '}', 'valor'
    )

  }

  return (
    <div className={styles.containerInner}>
      <div className={styles.inputPrecoBox}>
        <input type="text" value={values[0].toFixed(1)} />
        <span>Até</span>
        <input type="text" value={values[1].toFixed(1)} />
      </div>

      <div className={styles.rangeContainer}>
        {/* <Range
          values={values}
          step={props.step}
          min={props.min}
          max={props.max}
          onChange={(values) => search(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "60px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "9px",
                  width: "100%",
                  borderRadius: "14px",
                  background: getTrackBackground({
                    values,
                    colors: ["var(--secondary)", "var(--light-green)", "var(--secondary)"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className={styles.sliderThumb}
            >
              <div className={styles.sliderValue}>
                R$ {values[index].toFixed(1)}
              </div>
            </div>
          )}
        /> */}
      </div>
    </div>
  );
}
