import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import PropTypes from "prop-types";

const EmailSuccessAnimation = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.5,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            className="bg-gray-100 p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{
                scale: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            >
              <Check
                size={96}
                className="text-green-500 mb-4"
                strokeWidth={3}
              />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Email Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your message has been delivered.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailSuccessAnimation;

EmailSuccessAnimation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
