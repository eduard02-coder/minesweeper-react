import List from '../../List';
import Button from '../../Button';

function OptionsList({ items, selectedID, IdSetter }) {
  let selectedStyle;

  const displayItems = items.map((elem, index) => {
    selectedStyle = '';

    if (index === selectedID) {
      selectedStyle = 'text-white bg-[rgb(128,72,23)]';
    }
    return (
      <Button
        className={`w-30 py-2.5 text-[20px] bg-white text-[rgb(128,72,23)] border-2 rounded-[10px] ${selectedStyle}`}
        onClick={() => IdSetter(index)}
      >
        {elem}
      </Button>
    );
  });

  return (
    <List
      className="list-none flex gap-2 justify-center items-center"
      items={displayItems}
    />
  );
}

export default OptionsList;
