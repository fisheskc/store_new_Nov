"use client";

import ImageInputContainer from "@/components/form/ImageInputContainer";
import type { ComponentProps } from "react";

export default function ImageInputClientWrapper(
  props: ComponentProps<typeof ImageInputContainer>
) {
  return <ImageInputContainer {...props} />;
}

