import React, { useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { Container } from "./styles";

const Loading = () => {
  const loadingContainer = {
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "space-around",
  };

  const loadingCircle = {
    display: "block",
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "black",
    borderRadius: "0.25rem",
  };

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "50%",
    },
    end: {
      y: "140%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  const [animation, cycleAnimation] = useCycle("start", "end");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleAnimation();
    }, 600);
    return () => clearInterval(interval);
  }, [cycleAnimation]);

  return (
    <Container>
      <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial={animation}
        animate={animation}
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </Container>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Loading };
