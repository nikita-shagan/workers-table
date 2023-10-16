import React from "react";
import "./ChangeValueForm.css";



function ChangeValueForm({ handleDataChange, active }) {
  const [dayType, setDayType] = React.useState('work')

  const handleDayTypeChange = (evt) => {
    setDayType(evt.target.value)
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault()
    handleDataChange(dayType)
  }

  return (
    <form className='change-value-form' onSubmit={handleFormSubmit}>
      <select name="type-of-day" id="type-of-day" onChange={handleDayTypeChange}>
          <option value="work">Рабочий</option>
          <option value="holyday">Выходной</option>
          <option value="other">Другой</option>
      </select>
      <button type='submit' disabled={!active}>
        Сохранить
      </button>
    </form>
  );
}

export default ChangeValueForm;
