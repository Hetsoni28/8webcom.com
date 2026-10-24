'use client';

import { motion } from 'framer-motion';
import { Badge } from "@/components/atoms/Badge";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface SectionTitleProps {
  subTitle?: string;
  heading: React.ReactNode;
  highlight?: string;
  headingSuffix?: string;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  size?: "md" | "lg" | "xl" | "2xl" | "beast";
  theme?: "light" | "dark";
  className?: string;
  /** Disable built-in animation (e.g. when parent already animates) */
  noAnimate?: boolean;
}

export function SectionTitle({
  subTitle,
  heading,
  highlight,
  headingSuffix,
  description,
  align = "left",
  size = "beast",
  theme = "light",
  className,
  noAnimate = false,
}: SectionTitleProps) {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const renderHeading = () => (
    <>
      {heading}
      {highlight && (
        <>
          {" "}
          <span className="text-[#0799B3]">{highlight}</span>
        </>
      )}
      {headingSuffix && ` ${headingSuffix}`}
    </>
  );

  if (noAnimate) {
    return (
      <div className={cn("flex flex-col gap-5", alignments[align], className)}>
        {subTitle && <Badge label={subTitle} />}
        <Heading as="h2" size={size} color={theme === "dark" ? "white" : "default"}>
          {renderHeading()}
        </Heading>
        {description && (
          <Text color={theme === "dark" ? "white" : "muted"} className={cn("max-w-2xl text-base sm:text-[17px] leading-[1.75]", theme === "dark" ? "text-gray-400" : "text-gray-600")}>{description}</Text>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn("flex flex-col gap-5", alignments[align], className)}
    >
      {subTitle && (
        <motion.div variants={staggerItem}>
          <Badge label={subTitle} />
        </motion.div>
      )}
      <motion.div variants={staggerItem}>
        <Heading as="h2" size={size} color={theme === "dark" ? "white" : "default"}>
          {renderHeading()}
        </Heading>
      </motion.div>
      {description && (
        <motion.div variants={staggerItem}>
          <Text color={theme === "dark" ? "white" : "muted"} className={cn("max-w-2xl text-base sm:text-[17px] leading-[1.75]", theme === "dark" ? "text-gray-400" : "text-gray-600")}>{description}</Text>
        </motion.div>
      )}
    </motion.div>
  );
}
