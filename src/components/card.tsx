import React from "react";
import { Icons } from "./icons";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useTotp } from "~/hooks/useTotp";
import { Button } from "react-aria-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Value {
  id: string;
  issuer: string;
  label: string;
  algorithm: string;
  secret: string;
  period: number;
  digits: number;
}

interface CardProps {
  time: number;
  value: Value;
  children?: React.ReactNode;
}

export function Card(props: CardProps) {
  const { time, value, children } = props;
  const token = useTotp(value);
  const ctx = api.useContext();
  const { mutate } = api.totp.del.useMutation({
    onSuccess: () => {
      void ctx.totp.invalidate();
    },
  });
  return (
    <motion.li className="group relative flex h-40 w-40 flex-col items-center justify-center space-y-1 rounded-md border px-3 pt-4 shadow-md duration-500">
      <CountdownCircleTimer
        isPlaying
        size={105}
        duration={30}
        initialRemainingTime={time}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          return { shouldRepeat: true, delay: 0.1 };
        }}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      />
      <Button
        className={
          "absolute right-1 top-1 hidden outline-none group-hover:block"
        }
        onPress={() => mutate({ id: value.id })}
      >
        <Icons.dellete className="h-6 w-6 fill-none stroke-current stroke-2 text-gray-300 hover:text-gray-600" />
      </Button>
      <div className=" absolute left-1/2 top-1/3 -translate-x-1/2 translate-y-1 text-xl font-semibold leading-6 text-gray-900">
        {token}
      </div>
      <span className="flex h-8 w-28 items-center justify-center truncate px-4">
        {children}
      </span>
    </motion.li>
  );
}
