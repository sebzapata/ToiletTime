import React, { useState } from 'react';

const Input: React.FunctionComponent = () => {
  const [softnessValue, setSoftnessValue] = useState<number>(undefined);

  const sendData = () => {
    console.log("softness", softnessValue)
  }

  return (
    <div>
      <select name="stoolSoftness" onChange={(e) => setSoftnessValue(parseInt(e.target.value, 10))}>
        <option value={undefined}>--Please select a value--</option>
        <option value={1}>1 - Severe constipation</option>
        <option value={2}>2 - Mild constipation</option>
        <option value={3}>3 - Normal</option>
        <option value={4}>4 - Normal</option>
        <option value={5}>5 - Lacking fibre</option>
        <option value={6}>6 - Mild diarrhoea</option>
        <option value={7}>7 - Severe diarrhoea</option>
      </select>
      <input type="submit" value="Submit" onClick={sendData} />
    </div>
  )
};

export default Input;
