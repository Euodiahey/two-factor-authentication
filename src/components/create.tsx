import { Icons } from "./icons";
import { motion } from "framer-motion";
import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";

export function Create() {
  return (
    <DialogTrigger>
      <Button className="w-min rounded-lg border px-12 py-10 text-center text-gray-800 shadow-md shadow-indigo-50 outline-zinc-200 duration-500 hover:scale-105 hover:bg-zinc-50 hover:text-gray-950">
        <motion.div
          whileHover={{
            rotate: 90,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Icons.new className="h-6 w-6" />
        </motion.div>
      </Button>
      <Modal
        className={
          "fixed top-0 flex h-screen w-screen items-center justify-center border bg-zinc-300/50 p-4 shadow-lg"
        }
      >
        <motion.div
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Dialog className="rounded border border-red-900 bg-white p-8 outline-none">
            {({ close }) => (
              <motion.form
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0.8, scale: 0.5 }}
              >
                <Button onPress={close}>Submit</Button>
              </motion.form>
            )}
          </Dialog>
        </motion.div>
      </Modal>
    </DialogTrigger>
  );
}
