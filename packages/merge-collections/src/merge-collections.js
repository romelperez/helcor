import extend from 'extend';

export default function mergeCollections(
  arr1 = [],
  arr2 = [],
  providedOptions
) {
  const opts = {
    id: 'id',
    shallow: false,
    ...providedOptions
  };

  const { id, shallow } = opts;
  const arr = [];

  let temp1;
  let temp2;

  arr1.forEach(a1 => {
    temp1 = arr.find(a => a[id] === a1[id]);

    if (temp1) {
      extend(!shallow, temp1, a1);
    }

    temp2 = arr2.find(a2 => a2[id] === a1[id]);

    if (temp1) {
      extend(temp1, temp2);
    } else if (temp2) {
      arr.push(extend(!shallow, {}, a1, temp2));
    } else {
      arr.push(a1);
    }
  });

  arr2.forEach(a2 => {
    temp1 = arr.find(a => a[id] === a2[id]);

    if (!temp1) {
      arr.push(a2);
    }
  });

  return arr;
}
