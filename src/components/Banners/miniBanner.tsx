import Link from "next/link";
import miniBannerStyle from "@styles/components/MiniBanner.module.css";
import PropTypes from "prop-types";

interface MiniBannerProps {
  title: string;
  subtitle?: string;
  image: string;
}

function MiniBanner(props: MiniBannerProps) {

  return (
    <div
      className={` ${miniBannerStyle.miniBanner} miniBanner08`}
      style={{ backgroundImage: `url(${props.image})` }}
    >

      {/* <hgroup>
      <h3 className={miniBannerStyle.title}>{props.title}</h3>
      {props.subtitle && (
        <h4 className={miniBannerStyle.subtitle}>{props.subtitle}</h4>
      )}
    </hgroup> */}
    </div>
  );
}

MiniBanner.defaultProps = {
  image: "/images/mini-banner-1.png",
};

export default MiniBanner;
