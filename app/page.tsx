'use client'
import Button from '@/components/button'
import { GildedRose, Item } from '@/utils/gilded-rose'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  font-size: 64px;
  font-weight: lighter;
  @media (max-width: 768px) {
    font-size: 48px;
  }
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  overflow: auto;
  padding-bottom: 24px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`
const StoreItem = styled(motion.div)`
  display: flex;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  align-items: center;
  background: white;
  height: fit-content;
  p {
    flex: 1;
  }
  @media (max-width: 768px) {
    padding: 12px;
  }
`
const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out;
  &:hover {
    opacity: .6;
  }
`
const Pill = styled.div<{
  positive?: boolean;
  negative?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Form = styled(motion.form)`
  position: relative;
  margin-top: auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 24px;
  padding: 12px;
  border-radius: 12px;
  background: #9fadbc;
  width: 100%;
  .form-error {
    position: absolute;
    bottom: -32px;
    right: 12px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    bottom: 24px;
    gap: 12px;
    .form-error {
      right: unset;
      left: 12px;
    }
  }
`

export default function Home() {
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const [sellIn, setSellIn] = useState<number | undefined>(undefined);
  const [quality, setQuality] = useState<number | undefined>(undefined);
  const [store, setStore] = useState(new GildedRose(
    [
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 50, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
      new Item('Conjured Mana Cake', 3, 6),
    ]
  ));
  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    if (!name || !sellIn || !quality) {
      setFormError('Please fill in all fields');
      return;
    };
    const newItem = new Item(name, sellIn, quality);
    const updatedStore = new GildedRose();
    updatedStore.items = [...store.items, newItem];
    setStore(updatedStore);
    setName('');
    setSellIn(undefined);
    setQuality(undefined);
  }
  
  function handleUpdate() {
    const updatedStore = new GildedRose();
    updatedStore.items = store.items;
    updatedStore.updateQuality();
    setStore(updatedStore);
  }

  function handleDelete(index: number) {
    const updatedStore = new GildedRose();
    updatedStore.items = store.items.filter((item, i) => i !== index);
    setStore(updatedStore);
  }

  return (
    <main>
      <Row>
        <Header>Gilded Rose</Header>
        <Button
          clickHandler={handleUpdate}
          type="secondary"
          label="Next Day"
        />
      </Row>
      <Grid>
        {store.items.map((item, index) => (
          <StoreItem
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>{item.name}</p>
            <Pill>
              <Image
                src="/clock.svg"
                alt="clock"
                width={18}
                height={18}
                priority
              />
              <p>{item.sellIn}</p>
            </Pill>
            <Pill>
              <Image
                src="/check.svg"
                alt="check"
                width={18}
                height={18}
                priority
              />
              <p>{item.quality}</p>
            </Pill>
            <DeleteButton onClick={() => handleDelete(index)}>
              <Image
                src="/close.svg"
                alt="close"
                width={18}
                height={18}
                priority
              />
            </DeleteButton>
          </StoreItem>
        ))}
      </Grid>
      <Form
        onSubmit={submitForm}
        initial={{ y: 64 }}
        animate={{ y: 0 }}
      >
        <input
          className='name-input'
          type="text"
          id="name"
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          id="quality"
          placeholder='Quality'
          min={0}
          max={50}
          value={quality || ''}
          onChange={(e) => setQuality(parseInt(e.target.value))}
        />
        <input
          type="number"
          id="sell-in"
          placeholder='Sell In'
          min={0}
          value={sellIn || ''}
          onChange={(e) => setSellIn(parseInt(e.target.value))}
        />
        <Button
          type="primary"
          label="Add Item"
          clickHandler={submitForm}
        />
        {formError && <p className='form-error'>{formError}</p>}
      </Form>
    </main>
  )
}
