import { Form } from "./form";
import { Icons } from "./icons";
import { motion } from "framer-motion";

import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";

export function Create() {
  return (
    <li>
      <DialogTrigger>
        <Button className="flex h-40 w-40 items-center justify-center rounded-lg border px-12 py-10 text-center text-gray-800 shadow-md shadow-indigo-50 outline-zinc-200 duration-500 hover:scale-105 hover:bg-zinc-50 hover:text-gray-950">
          <motion.div
            whileHover={{
              rotate: 90,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Icons.new className="h-6 w-6 fill-none stroke-current stroke-2" />
          </motion.div>
        </Button>
        <Modal
          className={
            "fixed top-0 flex h-screen w-screen items-center justify-center border bg-zinc-500/50 p-4 shadow-lg"
          }
        >
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Dialog>{({ close }) => <Form close={close} />}</Dialog>
          </motion.div>
        </Modal>
      </DialogTrigger>
    </li>
  );
}
