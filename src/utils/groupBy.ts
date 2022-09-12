type IFunc<T> = (item: T) => string | number;

const groupBy = <T>(getAttr: IFunc<T>, objects: T[]) => {
  interface IGroups<T> {
    [key: string | number]: T[];
  }

  const grouped = objects.reduce((groups: IGroups<T>, item) => {
    const group = groups[getAttr(item)] || [];
    group.push(item);
    groups[getAttr(item)] = group;
    return groups;
  }, {});

  return grouped;
};

export default groupBy;
