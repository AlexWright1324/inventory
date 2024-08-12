import { persisted } from "svelte-persisted-store"

interface BasketItem {
	id: string
	quantity: number
}

export const Basket = () => {
	const { subscribe, update } = persisted("basket", [] as BasketItem[])

	const editItem = (id: string, quantity: number) => {
		update((items) => {
			const item = items.find((item) => item.id == id)

			if (item == undefined) items.push({ id, quantity })
			else item.quantity += 1

			return items
		})
	}

	const getQuantity = (id: string, basket: BasketItem[]) => {
		const item = basket.find((item) => item.id == id)

		if (item == undefined) return 1

		return item.quantity
	}

	const removeItem = (id: string) => {
		update((items) => items.filter((item) => item.id != id))
	}

	const itemPresent = (id: string, basket: BasketItem[]) => {
		return basket.find((item) => item.id == id) != undefined
	}

	return {
		subscribe,
		editItem,
		getQuantity,
		removeItem,
		itemPresent
	}
}
