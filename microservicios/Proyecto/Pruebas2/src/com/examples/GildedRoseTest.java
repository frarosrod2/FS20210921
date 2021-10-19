package com.examples;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GildedRoseTest {

	GildedRose gildedRose;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void testUpdateQuality() {
		Item[] items = new Item[] { new Item("Pan", 10, 10), new Item("Aged Brie", 10, 10),
				new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10),
				new Item("Sulfuras, Hand of Ragnaros", 10, 80), new Item("Azucar", -10, -10),
				new Item("Aged Brie", -10, 100), new Item("Aged Brie", -10, 10), new Item("Azucar", -10, 2),
				new Item("Backstage passes to a TAFKAL80ETC concert", -4, 10),};
		gildedRose = new GildedRose(items);
		gildedRose.updateQuality();
		assertEquals(9, items[0].quality);
		assertEquals(9, items[0].sellIn);
		assertEquals(11, items[1].quality);
		assertEquals(9, items[1].sellIn);
		assertEquals(13, items[2].quality);
		assertEquals(3, items[2].sellIn);
		assertEquals(80, items[3].quality);
		assertEquals(10, items[3].sellIn);
		assertEquals(-10, items[4].quality);
		assertEquals(-11, items[4].sellIn);
		assertEquals(100, items[5].quality);
		assertEquals(-11, items[5].sellIn);
		assertEquals(12, items[6].quality);
		assertEquals(-11, items[6].sellIn);
		assertEquals(0, items[7].quality);
		assertEquals(-11, items[7].sellIn);
		assertEquals(0, items[8].quality);
		assertEquals(-5, items[8].sellIn);
	}

}
