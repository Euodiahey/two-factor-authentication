import React from "react";

import { useMeter, useNumberFormatter } from "react-aria";

export function Meter({ value }: { value: number }) {
  const minValue = 0;
  const maxValue = 180;
  const size = 300;
  const center = size / 2;
  const strokeWidth = 14;
  const r = center - strokeWidth;
  const c = 2 * r * Math.PI;
  const a = c * (270 / 360);
  const percentage = (value - minValue) / (maxValue - minValue);
  const offset = c - percentage * a;

  const { meterProps } = useMeter({ value, minValue, maxValue });

  const formatter = useNumberFormatter({ style: "unit", unit: "mile-per-hour" });

  const parts = formatter.formatToParts(value);
  const valueString = parts.find((p) => p.type === "integer");
  const unit = parts.find((p) => p.type === "unit");

  return (
    <svg
      {...meterProps}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      strokeWidth={strokeWidth}
    >
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="dodgerblue"
        strokeOpacity={0.2}
        strokeDasharray={`${a} ${c}`}
        strokeLinecap="round"
        transform={`rotate(135 ${center} ${center})`}
      />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="dodgerblue"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(135 ${center} ${center})`}
      />
      <text
        role="presentation"
        x={center}
        y={center + 20}
        fontFamily="ui-rounded, system-ui"
        fontSize={80}
        textAnchor="middle"
        fill="dodgerblue"
      >
        {valueString!.value}
      </text>
      <text
        role="presentation"
        x={center}
        y={center + 20 + 25}
        fontFamily="ui-rounded, system-ui"
        fontSize={20}
        textAnchor="middle"
        fill="dodgerblue"
        fillOpacity={0.85}
      >
        {unit!.value}
      </text>
    </svg>
  );
}
