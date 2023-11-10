import { GildedRose } from "@/utils/gilded-rose";
import Image from "next/image";
import styled from "styled-components";
import Button from "./button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ItemCarousel = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow: auto;
  padding-bottom: 24px;
  flex: 1;
  width: calc(100% + 64px);
  margin-left: 64px;
  @media (max-width: 768px) {
    width: calc(100% + 24px);
    margin-left: 24px;
  }
`
const StoreItem = styled(motion.div)`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  align-items: center;
  background: white;
  max-width: 300px;
  min-width: 300px;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    width: 100%;
    flex: 1;
  }
  .rose {
    width: 100%;
    height: calc(100% / 1.5);
    object-fit: cover;
  }
  .delete-button {
    position: absolute;
    top: 12px;
    right: 12px;
  }
  .pill-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`
const Pill = styled.div<{
  positive?: boolean;
  negative?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 24px;
  font-size: 12px;
  background: #ececec;
`

function Carousel ({
  store,
  handleDelete,
}: {
  store: GildedRose,
  handleDelete: Function,
}) {
  return (
    <ItemCarousel >
      {store.items.map((item, index) => (
        <StoreItem
          key={index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
        >
          <img className='rose' src={`/rose.png`} alt={item.name} />
          <div className="content">
            <p>{item.name}</p>
            <div className="pill-container">
              <Pill>
                <Image
                  src="/clock.svg"
                  alt="clock"
                  width={14}
                  height={14}
                  priority
                />
                <p>{item.sellIn}</p>
              </Pill>
              <Pill>
                <Image
                  src="/check.svg"
                  alt="check"
                  width={14}
                  height={14}
                  priority
                />
                <p>{item.quality}</p>
              </Pill>
            </div>
            <Button
              className="delete-button"
              type="tertiary"
              label="Delete"
              clickHandler={() => handleDelete(index)}
            />
          </div>
        </StoreItem>
      ))}
  </ItemCarousel>
  )
}

export default Carousel;