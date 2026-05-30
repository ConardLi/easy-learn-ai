import React from "react";

type Props = {
  num: string;
  label: string;
  children: React.ReactNode;
  background?: string;
  id?: string;
};

export default function SectionFrame({
  num,
  label,
  children,
  background = "bg-cream",
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`${background} px-6 md:px-12 lg:px-24 py-20 md:py-28`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">{num}</span>
          <span className="section-anchor-label">{label}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
