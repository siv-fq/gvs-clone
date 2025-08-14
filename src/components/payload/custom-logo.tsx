"use client";

import React from "react";
import Image from "next/image";

const CustomLogo: React.FC = () => (
  <Image
    src="/greenvan-logo.svg"
    alt="greenvan logo"
    width={100}
    height={100}
  />
);

export default CustomLogo;
