// Approximate web equivalent of RN Carousel — Framer Motion drag instead of PanResponder.
import { motion, useMotionValue } from 'framer-motion';
import type { CarouselProps } from './types';

export function Carousel<T>({
  items,
  renderItem,
  activeIndex,
  onChangeIndex,
  itemWidth = 280,
  gap = 12,
  className = '',
}: CarouselProps<T>) {
  const x = useMotionValue(0);
  const slotWidth = itemWidth + gap;

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    let nextIndex = activeIndex;
    if (offset < -slotWidth / 4 || velocity < -300) nextIndex = Math.min(activeIndex + 1, items.length - 1);
    else if (offset > slotWidth / 4 || velocity > 300) nextIndex = Math.max(activeIndex - 1, 0);
    onChangeIndex(nextIndex);
  };

  return (
    <div className={`overflow-hidden ${className}`} style={{ width: '100%' }}>
      <motion.div
        className="flex"
        style={{ x, gap }}
        drag="x"
        dragConstraints={{ left: -(items.length - 1) * slotWidth, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={{ x: -activeIndex * slotWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ width: itemWidth, flexShrink: 0 }}>
            {renderItem(item, i)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export type { CarouselProps };
