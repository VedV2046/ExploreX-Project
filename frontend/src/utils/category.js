import { CATEGORY_DATA } from "../data/categories";

const ICON_MAP = {
  'healthcare.hospital': '🏥',
  'healthcare.pharmacy': '💊',
  'catering.restaurant': '🍽️',
  'catering.cafe': '☕',
  'tourism.attraction': '🏛️',
  'entertainment.museum': '🖼️',
  'entertainment.zoo': '🦁',
  'leisure.park': '🌳',
  'public_transport.bus': '🚌',
  'service.vehicle.parking': '🅿️',
  'accommodation.hotel': '🏨',
};

export function getCategoryIcon(category) {
  if (!category) return '📍';
  return ICON_MAP[category] || '📍';
}

export function getCategoryLabel(category) {
  if (!category) return 'Place';

  // First try to find a matching item in CATEGORY_DATA
  for (const group of CATEGORY_DATA) {
    if (Array.isArray(group.items)) {
      const match = group.items.find((it) => it.value === category || it.value === category.toLowerCase());
      if (match) return match.label;
    }
    if (group.id === category) return group.label;
  }

  // Fallback: try to prettify the last segment
  const parts = String(category).split('.');
  const last = parts[parts.length - 1];
  if (!last) return category;
  // convert snake_case or kebab to normal words
  const words = last.replace(/_/g, ' ').replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}
