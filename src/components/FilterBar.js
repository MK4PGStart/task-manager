import React from 'react';
import './FilterBar.css';

const FILTERS = [
  { value: 'all', label: 'Все задачи' },
  { value: 'pending', label: 'Ожидают' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Выполнено' }
];

function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Фильтр:</span>
      <div className="filter-buttons">
        {FILTERS.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;

