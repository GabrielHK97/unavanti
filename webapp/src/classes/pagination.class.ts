export class Pagination {
	page: number = 1;
	itemsPerPage: number = 15;
	optionsOfItemsPerPage: Array<number> = [10, 15, 20];

	getSkip(): number {
		return this.page > 0 ? (this.page - 1) * this.itemsPerPage : 0;
	}

	getTake(): number {
		return this.itemsPerPage;
	}

	getPages(totalItems: number): number {
		return totalItems ? Math.ceil(totalItems / this.itemsPerPage) : 1;
	}
}
