import "./Table.css";
import React from 'react';
import {DAYS_NAMES} from "../../utils/constants/constants";
import ChangeValueForm from "../ChangeValueForm/ChangeValueForm";


function Table({ data, handleDataChange }) {
  const [chosen, setChosen] = React.useState({})
  const [newWorker, setNewWorker] = React.useState('')

  const handleNewWorkerChange = (evt) => {
    setNewWorker(evt.target.value)
  }

  const isInChosen = (day, workerId) => {
    return chosen[`${day}-${workerId}`] === `${day}-${workerId}`
  }

  const handleCellClick = (evt) => {
    const day = evt.target.getAttribute('day')
    const workerId = evt.target.getAttribute('id')
    const uniqCell = `${day}-${workerId}`

    if (isInChosen(day, workerId)) {
      const { [uniqCell]: cell, ...rest } = chosen
      setChosen(rest)
    } else {
      setChosen({...chosen, [`${day}-${workerId}`]: `${day}-${workerId}`})
    }
  }

  const getDaysNames = (firstDayName, daysAmount) => {
    let dayIndex = DAYS_NAMES.indexOf(firstDayName)
    const res = []
    for (let i = 0; i < daysAmount; i++) {
      res.push(DAYS_NAMES[dayIndex])
      dayIndex += 1
      if (dayIndex > 6) {
        dayIndex = 0
      }
    }
    return res
  }

  const getWorkersCopy = () => {
    const newWorkers = []
    data.workers.forEach((worker) => {
      const newWorkerData = [...worker.data]
      newWorkers.push({...worker, data: newWorkerData})
    })
    return newWorkers
  }

  const handleCellValuesChange = (newValue) => {
    const newData = {...data}
    const newWorkers = getWorkersCopy()

    Object.keys(chosen).forEach((value) => {
      const [day, workerId] = value.split('-')
      const worker = newWorkers.find((obj) => String(obj.id) === String(workerId))
      if (worker) {
        worker.data[Number(day)] = newValue[0]
      }
    })
    newData.workers = newWorkers
    handleDataChange(newData)
    setChosen({})
  }

  const handleAddWorkerSubmit = (evt) => {
    evt.preventDefault()
    const newData = {...data}
    const newWorkers = getWorkersCopy()

    // Здесь нужно отправить на апи нового работника, там ему присвоится ID
    // После этого заново подгрузить работников с апи и отрисовать
    console.log(newWorkers)
    newWorkers.push({
      name: newWorker,
      id: newWorkers.length + 1,
      data: [...Array(31).fill('')]
    })
    newData.workers = newWorkers
    handleDataChange(newData)
  }

  const handleWorkerDelete = (evt) => {
    const id = evt.target.getAttribute('value')
    const newData = {...data}
    const newWorkers = []
    data.workers.forEach((worker) => {
      if (String(worker.id) !== String(id)) {
        const newWorkerData = [...worker.data]
        newWorkers.push({...worker, data: newWorkerData})
      }
    })
    newData.workers = newWorkers
    handleDataChange(newData)
  }

  return (
    <>
      <div className='table'>
        <div className='table__row table__row_gray'>
          <div className='table__row-head'>

          </div>
          <div className='table-row-body'>
            {getDaysNames(data.firstDayName, data.daysAmount).map((value, index) => (
              <div className='table__row-cell light-font-color' key={index}>
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className='table__row table__row_gray'>
          <div className='table__row-head'>
            Сотрудник
          </div>
          <div className='table-row-body'>
            {[...Array(data.daysAmount).keys()].map((value, index) => (
              <div className='table__row-cell' key={index}>
                {value + 1}
              </div>
            ))}
          </div>
        </div>
        {data.workers && data.workers.map((worker, index) => (
          <div className='table__row' key={worker.id}>
            <div className='table__row-head bold'>
              <p className='table__row-head-text'>
                {worker.name}
              </p>
              <button
                className='table__delete-worker-btn'
                type='submit'
                onClick={handleWorkerDelete}
                value={worker.id}
              >
                Удалить
              </button>
            </div>
            <div className='table-row-body'>
              {worker.data.map((row, index) => (
                <div
                  className={`
                    table__row-cell 
                    table__row-cell_outline 
                    ${isInChosen(index, worker.id) && 'outline-red'}
                  `}
                  onClick={handleCellClick}
                  key={index}
                  day={index}
                  id={worker.id}
                >
                  {row}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className='table__row'>
          <form className='table__row-head' onSubmit={handleAddWorkerSubmit}>
            <input
              className='table__add-worker-input'
              type='text'
              placeholder='Ф.И.О'
              minLength='2'
              required
              onChange={handleNewWorkerChange}
              value={newWorker}
            />
            <button className='table__add-worker-btn' type='submit'>
              Добавить
            </button>
          </form>
          <div className='table-row-body'>
            {[...Array(data.daysAmount).keys()].map((value, index) => (
              <div className='table__row-cell' key={index}>

              </div>
            ))}
          </div>
        </div>
      </div>
      <ChangeValueForm
        active={Boolean(Object.keys(chosen).length)}
        handleDataChange={handleCellValuesChange}
      />
    </>
  );
}

export default Table;
