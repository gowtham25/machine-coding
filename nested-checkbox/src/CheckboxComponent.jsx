const checkboxConfig = [
    {
      id: 1,
      name: "Fruits",
      children: [
        {
          id: 2,
          name: "Citrus",
          children: [
            { id: 3, name: "Orange" },
            { id: 4, name: "Lemon" },
          ],
        },
        {
          id: 5,
          name: "Berries",
          children: [
            { id: 6, name: "Strawberries" },
            { id: 7, name: "Blueberries" },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "Tropical",
      children: [
        { id: 9, name: "Banana" },
        { id: 10, name: "Mango" },
      ],
    },
    { id: 11, name: "Apple" },
  ];
  
  const CheckboxComponent = ({ data, checked = {}, setChecked }) => {
    const handleChange = (isChecked, node) => {
      setChecked((prev) => {
        const newState = {
          ...prev,
          [node.id]: isChecked,
        };
  
        const updateChildren = (node) => {
          node.children?.forEach((val) => {
            newState[val.id] = isChecked;
            if (val.children) {
              updateChildren(val);
            }
          });
        };
  
        updateChildren(node);
  
        const verifychecked = (node) => {
          if (!node.children) {
            return newState[node.id] || false;
          }
          const allChildrenChecked = node.children?.every((child) =>
            verifychecked(child)
          );
          newState[node.id] = allChildrenChecked;
          return allChildrenChecked;
        };
        checkboxConfig.map((child) => verifychecked(child));
        return newState;
      });
    };
  
    return (
      <div>
        {data.map((val, index) => {
          const { id, name, children = [] } = val || {};
          return (
            <div key={id} className="parent">
              <label>
                <input
                  type="checkbox"
                  checked={checked[id] || false}
                  onChange={(e) => handleChange(e.target.checked, val)}
                />
                {name}
              </label>
              {children.length > 0 && (
                <div className="children">
                  <CheckboxComponent
                    data={children}
                    checked={checked}
                    setChecked={setChecked}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default CheckboxComponent;
  