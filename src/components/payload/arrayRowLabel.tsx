"use client";
import { useRowLabel } from "@payloadcms/ui";

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ text?: string }>();

  const customLabel = data.text || `Link ${String(rowNumber).padStart(2, "0")}`;

  return <div>{customLabel}</div>;
};

export default ArrayRowLabel;
