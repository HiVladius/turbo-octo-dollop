import { motion } from 'framer-motion';
import logo from '../../assets/logo2-removebg.png';


export const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="heartbeat items-center justify-center">
      <img src={logo} alt="" className="h-12 w-12" />
    </div>
    <style>
      {`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }
        .heartbeat {
          animation: heartbeat 1.2s infinite;
        }
      `}
    </style>
  </motion.div>
);