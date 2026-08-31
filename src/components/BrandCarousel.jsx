import { createElement } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiAdobe, SiInstagram, SiNetflix, SiTesla } from "react-icons/si";

const brands = [
  {
    name: "Adobe",
    wordmarkSrc: "/images/Adobe_idLnet8cfu_1.png",
    Icon: SiAdobe,
    iconWrapperClassName:
      "flex h-5 w-5 shrink-0 items-center justify-center sm:h-7 sm:w-7",
    iconClassName: "h-full w-full text-red-600",
    wordmarkClassName: "h-[42px] w-auto brightness-0 invert sm:h-[47px]",
    containerClassName: "-ml-6 -mr-4 sm:-ml-8 sm:-mr-6",
  },
  {
    name: "Netflix",
    wordmarkSrc: "/images/Netflix_Logo_2.webp",
    Icon: SiNetflix,
    iconWrapperClassName:
      "flex h-5 w-5 shrink-0 items-center justify-center sm:h-7 sm:w-7",
    iconClassName: "h-full w-full text-white",
    wordmarkClassName: "h-[17px] w-auto sm:h-[25px]",
  },
  {
    name: "Tesla",
    wordmarkSrc: "/images/Tesla_Logo_1.png",
    Icon: SiTesla,
    iconWrapperClassName:
      "flex h-5 w-5 shrink-0 items-center justify-center sm:h-7 sm:w-7",
    iconClassName: "h-full w-full text-white",
    wordmarkClassName: "h-[15px] w-auto sm:h-5",
  },
  {
    name: "LinkedIn",
    wordmark: "LinkedIn",
    Icon: FaLinkedinIn,
    iconWrapperClassName:
      "flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.2rem] bg-[#0A66C2] sm:h-7 sm:w-7",
    iconClassName: "h-4 w-4 text-white sm:h-6 sm:w-6",
    wordmarkClassName: "text-base leading-none font-bold text-white sm:text-xl",
  },
  {
    name: "Instagram",
    wordmarkSrc: "/images/Instagram_Logo_1.png",
    Icon: SiInstagram,
    iconWrapperClassName:
      "flex h-5 w-5 shrink-0 items-center justify-center sm:h-7 sm:w-7",
    iconClassName: "h-full w-full text-white",
    wordmarkClassName: "h-5 w-auto sm:h-7",
  },
  {
    name: "Pinterest",
    wordmarkSrc: "/images/Pinterest_Logo_1.png",
    wordmarkClassName: "h-[23px] w-auto sm:h-[31px]",
  },
  {
    name: "Framer",
    wordmarkSrc: "/images/Framer_idEJvrCSQl_1.png",
    wordmarkClassName: "h-5 w-auto sm:h-7",
  },
  {
    name: "GitHub",
    wordmarkSrc: "/images/GitHub_Logo_1.png",
    wordmarkClassName: "h-5 w-auto sm:h-7",
  },
  {
    name: "Reddit",
    wordmarkSrc: "/images/Reddit_Logo_1.png",
    wordmarkClassName: "h-5 w-auto sm:h-7",
    containerClassName: "-ml-5 -mr-4 sm:-ml-6 sm:-mr-5",
  },
];

const BrandLogoGroup = ({ isDuplicate = false }) => {
  return (
    <div
      className="flex shrink-0 items-center gap-8 px-8 sm:gap-12 sm:px-12"
      aria-hidden={isDuplicate || undefined}
      role={isDuplicate ? undefined : "list"}
    >
      {brands.map(
        ({
          name,
          wordmark,
          wordmarkSrc,
          Icon,
          iconWrapperClassName,
          iconClassName,
          wordmarkClassName,
          containerClassName,
        }) => (
        <div
          key={name}
          className={`flex shrink-0 items-center gap-2 sm:gap-3 ${containerClassName || ""}`}
          role={isDuplicate ? undefined : "listitem"}
        >
          {Icon && (
            <span className={iconWrapperClassName}>
              {createElement(Icon, {
                "aria-hidden": true,
                className: iconClassName,
              })}
            </span>
          )}
          {wordmarkSrc ? (
            <img src={wordmarkSrc} alt={name} className={wordmarkClassName} />
          ) : (
            <span className={wordmarkClassName}>{wordmark}</span>
          )}
        </div>
        )
      )}
    </div>
  );
};

const BrandCarousel = () => {
  return (
    <div
      className="-mt-[28px] overflow-hidden bg-gray-950 py-[18.5px] sm:py-[26.5px]"
      role="region"
      aria-label="Brand carousel"
    >
      <div className="brand-carousel-track flex w-max">
        <BrandLogoGroup />
        <BrandLogoGroup isDuplicate />
        <BrandLogoGroup isDuplicate />
        <BrandLogoGroup isDuplicate />
      </div>
    </div>
  );
};

export default BrandCarousel;
