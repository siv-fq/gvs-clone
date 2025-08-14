"use client";
import { useRowLabel } from "@payloadcms/ui";

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    text?: string;
    heading?: string;
  }>();
  const index = (rowNumber ?? 0) + 1;
  const customLabel =
    data.text || data.heading || `Row ${String(index).padStart(2, "")}`;

  return <div>{customLabel}</div>;
};

export default ArrayRowLabel;
