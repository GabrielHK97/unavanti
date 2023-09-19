import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Pagination } from '../../classes/pagination.class';

interface TableFooterProps {
    totalItems: number;
	getPagination: any
}

export default function TableFooter({totalItems, getPagination}: TableFooterProps) {

    const [pagination, setPagination]= useState(new Pagination());
	getPagination(pagination);

    function backwardStep(): void {
		if (pagination.page - 1 > 0){
            setPagination((previous) => {
                const current: Pagination = new Pagination();
                current.page = previous.page - 1;
                return current;
            });
        }
	}

	function backward(): void {
		setPagination((previous) => {
            const current: Pagination = new Pagination();
            current.page = 1;
            return current;
        });
	}

	function fowardStep(): void {
		if (pagination.page + 1 <= Math.ceil(totalItems / pagination.itemsPerPage)) {
            setPagination((previous) => {
                const current: Pagination = new Pagination();
                current.page = previous.page + 1;
                return current;
            });
        }
	}

	function foward(): void {
        setPagination((previous) => {
            const current: Pagination = new Pagination();
            current.page = Math.ceil(totalItems / previous.itemsPerPage);
            return current;
        });
	}

	function resetPage(): void {
        setPagination((previous) => {
            const current: Pagination = new Pagination();
            current.page = previous.page ?? 1;
            return current;
        });
	}

    function handleItemsPerPage(e: ChangeEvent<HTMLSelectElement>) {
        setPagination((previous) => {
            const current: Pagination = new Pagination();
            current.itemsPerPage = +e.target.value;
            return current;
        });
    }

    function handlePage(e: ChangeEvent<HTMLInputElement>) {
        setPagination((previous) => {
            const current: Pagination = new Pagination();
            current.page = +e.target.value;
            return current;
        });
    }
    return <div className="bg-gray-800 flex h-10 w-full flex-row justify-center items-center space-x-2 rounded-b-lg p-2">
	<div className="flex flex-row items-center justify-center space-x-2">
		<div onClick={backward}>
			<FontAwesomeIcon icon={faBackward} color="white"/>
		</div>

		<div onClick={backwardStep}>
			<FontAwesomeIcon icon={faBackwardStep} color="white"/>
		</div>
		<div className="flex flex-row items-center justify-center space-x-2 text-sm">
			<div className="text-white">Page</div>
			<input
				type="number"
				min={0}
				max={pagination.getPages(totalItems)}
				value={pagination.page}
                onChange={handlePage}
				className="input input-sm bg-neutral-content w-min rounded"
				onBlur={resetPage}
				readOnly={pagination.getPages(totalItems) === 0}
			/>
			<div className="text-white">of {pagination.getPages(totalItems)}</div>
		</div>
		<div onClick={fowardStep}>
			<FontAwesomeIcon icon={faForwardStep} color="white"/>
		</div>
		<div onClick={foward}>
			<FontAwesomeIcon icon={faForward} color="white"/>
		</div>
	</div>
</div>
}