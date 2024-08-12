import { writable } from "svelte/store"

interface BasketItem {
	id: string
	quantity: number
}

export const basket = writable<BasketItem[]>(JSON.parse(localStorage.getItem("basket") || "[]"))

basket.subscribe((value) => {
	localStorage.basket = value
})
