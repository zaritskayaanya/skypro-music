import { TrackTypes } from '../sharedTypes/shared.Types';

export function formatTime(time: number) {
  const minuts = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outInputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minuts} : ${outInputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
};

export function getUniqueValueByKey(
  arr: TrackTypes[],
  key: keyof TrackTypes,
): string[] {
  //Используем Set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  // Проходим по каждому объекту в массиве
  arr.forEach((item) => {
    const value = item[key];

    // Если значение массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    }
    // Если значение строка
    else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  //Преобразуем обратно в массив
  return Array.from(uniqueValues);
}

export function getUniqueReleaseYears(arr: TrackTypes[]): number[] {
  const uniqueYears = new Set<number>();

  arr.forEach((item) => {
    const dateString = item.release_date;
    if (dateString) {
      try {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          // Проверяем, что дата валидна
          const year = date.getFullYear();
          uniqueYears.add(year);
        } else {
          const parts = dateString.split('-');
          if (parts.length > 0 && parts[0].length === 4) {
            const year = parseInt(parts[0], 10);
            if (!isNaN(year)) {
              uniqueYears.add(year);
            }
          }
        }
      } catch (e) {
        console.error(`Ошибка: ${dateString}`, e);
      }
    }
  });

  return Array.from(uniqueYears).sort((a, b) => a - b);
}