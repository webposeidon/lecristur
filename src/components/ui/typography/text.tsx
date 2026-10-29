import clsx from 'clsx';
import React from 'react';

const classes = {
  h1: 'font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F284B]',
  h2: 'font-sans text-2xl md:text-3xl font-bold text-[#2C2C2C]',
  h3: 'font-sans text-xl md:text-2xl font-bold text-[#2C2C2C]',
  h4: 'font-sans text-lg md:text-xl font-bold text-[#2C2C2C]',
  h5: 'text-base font-bold text-[#2C2C2C]',
  h6: 'text-sm font-bold text-[#2C2C2C]',
  p: 'text-sm md:text-base text-[#777777] leading-relaxed',
  span: '',
  small: 'text-xs text-[#909090]',
};

export interface TextProps {
  tag?: keyof typeof classes;
  children: React.ReactNode;
  className?: string;
}

export default function Text({
  tag = 'p',
  children,
  className,
}: TextProps) {
  const Component = tag;
  return (
    <Component className={clsx(classes[tag], className)}>
      {children}
    </Component>
  );
}

Text.displayName = 'Text';
