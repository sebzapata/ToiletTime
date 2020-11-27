import React, { useState } from 'react';

const Input: React.FunctionComponent = () => {
  const [softnessValue, setSoftnessValue] = useState<number>(undefined);

  return (
    <form onSubmit={() => console.log(softnessValue)}>
      <select name="stoolSoftness" onChange={(e) => setSoftnessValue(parseInt(e.target.value, 10))}>
        <option value={1}>1 - Severe constipation</option>
        <option value={2}>2 - Mild constipation</option>
        <option value={3}>3 - Normal</option>
        <option value={4}>4 - Normal</option>
        <option value={5}>5 - Lacking fibre</option>
        <option value={6}>6 - Mild diarrhoea</option>
        <option value={7}>7 - Severe diarrhoea</option>
      </select>
      <input type="submit" value="Submit" />
    </form>
  )
};

export default Input;
