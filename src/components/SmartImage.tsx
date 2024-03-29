import Image from "next/image";
import { FC, useEffect } from "react";

interface SmartImageProps {
  src: string;
  objectFit?: "contain" | "cover" | "";
  layout?: "fill" | "responsive";
  onError?: any;
  className?: string;
  isMiniBanner?: boolean;
  width?: number | null
  height?: number | null
  alt?: string;
}

const SmartImage: FC<SmartImageProps> = ({
  src,
  objectFit = "contain",
  layout = "responsive",
  onError,
  className,
  isMiniBanner,
  width,
  height,
  alt = "",
}) => {



  return (
    <>
      {
        layout === "fill" ?
          <Image
            className={className}
            onError={onError}
            src={src || "https://erp.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg"}
            layout={layout}
            objectFit={objectFit}
            alt={alt}
          />
          :
          <Image
            width={width ?? 100}
            height={height ?? 100}
            className={className}
            onError={onError}
            src={src || "https://erp.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg"}
            layout={layout}
            objectFit={objectFit}
            alt={alt}
          />

      }

    </>

  );
};

export default SmartImage;
