export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  increaseQuality(item: Item, quantity: number = 1) {
    // Move max quality threshold to this method
    if (item.quality + quantity >= 50) {
      item.quality = 50;
    } else {
      // Cleaner syntax
      item.quality += quantity;
    }
  }

  decreaseQuality(item: Item, quantity: number = 1) {
    // Move min quality threshold to this method
    if (item.quality - quantity <= 0) {
      item.quality = 0;
    } else {
      // Cleaner syntax
      item.quality -= quantity;
    }
  }

  updateQuality(): GildedRose {
    // Use forEach instead of for loop
    this.items.forEach(item => {
      const isExpired = item.sellIn <= 0;
      // Use switch as the core variable of quality change is name
      // also there was a lot of conditions using != 'name' while some were ==, very confusing
      // Stop two step quality adjustments, just use quantity to adjust with expiry in mind
      // removes the extra nexted if statments too
      switch (item.name) {
        // Skip item:Sulfuras, no changes needed
        case 'Sulfuras, Hand of Ragnaros':
          if (item.sellIn !== 0) {
            item.sellIn = 0;
          }
          if (item.quality !== 80) {
            item.quality = 80;
          }
          return;
        case 'Aged Brie':
          this.increaseQuality(item, isExpired ? 2 : 1);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (isExpired) {
            // set to 0 instead of confusing "item.quality - item.quality"
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            this.increaseQuality(item, 3);
          } else if (item.sellIn <= 10) {
            this.increaseQuality(item, 2);
          } else {
            this.increaseQuality(item);
          }
          break;
        case item.name.match(/^Conjured/)?.input:
          this.decreaseQuality(item, isExpired ? 4 : 2);
          break;
        default:
          this.decreaseQuality(item, isExpired ? 2 : 1);
          break;
      }
      // adjust sell in after modifications
      item.sellIn--;
    });
    return this.items;
  }
}
