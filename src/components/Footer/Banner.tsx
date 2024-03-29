import Link from "next/link";
import bannerStyle from "@styles/components/FooterBanner.module.css";
import PropTypes from "prop-types";

interface BannerProps {
  title: string;
  subtitle?: string;
  image: string;
}

function Banner(props: BannerProps) {

  return (
    <div
      className={bannerStyle.miniBanner}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <hgroup>
        <h3 className={bannerStyle.title}>{props.title}</h3>
        {props.subtitle && (
          <h4 className={bannerStyle.subtitle}>{props.subtitle}</h4>
        )}
      </hgroup>
    </div>
  );
}

Banner.defaultProps = {
  image: "/images/mini-banner-1.png",
};

export default Banner;
