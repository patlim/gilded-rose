'use client'
import Button from '@/components/button'
import Carousel from '@/components/carousel'
import { GildedRose, Item } from '@/utils/gilded-rose'
import { AnimatePresence, motion } from 'framer-motion'
import React, { MouseEventHandler, useState } from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  font-size: 64px;
  flex: 1;
  @media (max-width: 768px) {
    font-size: 48px;
  }
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    .auto-fill {
      display: none;
    }
  }
`
const Form = styled(motion.form)`
  position: relative;
  margin-top: auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 24px;
  padding: 12px;
  border-radius: 12px;
  background: #2a2a2a;
  width: 100%;
  .form-error {
    position: absolute;
    bottom: -32px;
    right: 12px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 12px;
    .form-error {
      right: unset;
      bottom: unset;
      top: -32px;
      left: 12px;
    }
  }
`

export default function Home() {
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const [sellIn, setSellIn] = useState<number | undefined>(undefined);
  const [quality, setQuality] = useState<number | undefined>(undefined);
  const [store, setStore] = useState(new GildedRose());
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
  
  function autoFill () {
    setStore(new GildedRose(
      [
        new Item('Aged Brie', 2, 0),
        new Item('Elixir of the Mongoose', 5, 7),
        new Item('Sulfuras, Hand of Ragnaros', 50, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
        new Item('Conjured Mana Cake', 3, 6),
        new Item('Aged Brie', 2, 0),
        new Item('Elixir of the Mongoose', 5, 7),
        new Item('Sulfuras, Hand of Ragnaros', 50, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
        new Item('Conjured Mana Cake', 3, 6),
      ]
    )); 
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
        {store.items.length === 0 && (
          <Button
            clickHandler={autoFill}
            className='auto-fill'
            type="secondary"
            label="Autofill"
          />
        )}
        <Button
          clickHandler={handleUpdate}
          type="primary"
          label="Next Day"
        />
      </Row>
      <Carousel
        store={store}
        handleDelete={handleDelete}
      />
      <Form
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
