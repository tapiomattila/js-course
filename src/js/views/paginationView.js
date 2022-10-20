import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // 1. page, there are other pages
        if (currentPage === 1 && numPages > 1) {
            return this._generateMarkupButtonForward(currentPage);
        }

        // last page
        if (currentPage === numPages && numPages > 1) {
            return this._generateMarkupButtonPrev(currentPage);
        }

        // other page
        if (currentPage < numPages) {
            return `${this._generateMarkupButtonPrev(currentPage)}${this._generateMarkupButtonForward(currentPage)}`;
        }

        // 1. page, no other pages
        return '';
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkupButtonPrev(currentPage) {
        return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `
    }

    _generateMarkupButtonForward(currentPage) {
        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
            `
    }
}

export default new PaginationView();