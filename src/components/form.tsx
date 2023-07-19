import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Icons } from "./icons";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useTotp } from "~/hooks/useTotp";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Label, Input } from "react-aria-components";

import type { TotpValues } from "~/hooks/useTotp";

export function Form({ close }: { close: () => void }) {
  const ctx = api.useContext();
  const [issuer, setIssuer] = React.useState<string>("");
  const [secret, setSecret] = React.useState<string>("");

  const values: TotpValues = {
    issuer: issuer ? issuer : "default",
    label: "AzureDiamond",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret ? secret : "1",
  };

  const { mutate } = api.totp.add.useMutation({
    onSuccess: () => {
      void ctx.totp.getAll.invalidate();
    },
  });

  const success = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    mutate(values);
    close();
  };
  const fail = () => {
    toast.error("Please check your entry!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const res = useTotp(values);
    res === "error" ? fail() : success();
    console.log(res);
  };
  return (
    <motion.form
      onSubmit={handleSubmit}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0.8, scale: 0.5 }}
      className="relative mb-4 flex flex-col gap-4 rounded-lg border border-gray-400 bg-white px-10 pb-6 pt-10 shadow-md"
    >
      <ToastContainer />
      <TextField
        aria-label="name"
        autoFocus
        name="issuer"
        onChange={(value) => setIssuer(value)}
      >
        <Label aria-label="name labelt" className="mb-2 block text-sm font-bold text-gray-700">
          Name
        </Label>
        <Input
        aria-label="name input"
          className={
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          }
        />
      </TextField>
      <TextField
        aria-label="secret"
        name="secret"
        onChange={(value) => setSecret(value)}
      >
        <Label className="mb-2 block text-sm font-bold text-gray-700">
          Secret
        </Label>
        <Input
          aria-label="secret input"
          className={
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          }
        />
      </TextField>
      <Button
        aria-label="submit"
        type="submit"
        className={
          "mt-2 w-full rounded-md border bg-blue-500 py-1.5 text-white"
        }
      >
        Submit
      </Button>
      <Button
        aria-label="close"
        onPress={close}
        className={"absolute right-3 top-3 z-10 outline-none"}
      >
        <Icons.octagon className="h-6 w-6 fill-none stroke-current stroke-2 text-gray-300 hover:text-gray-600" />
      </Button>
    </motion.form>
  );
}
