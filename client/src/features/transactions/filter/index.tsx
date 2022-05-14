import React, { FormEvent, useState } from "react"
import { DateRangePicker } from "react-date-range"
import Dropdown from "react-bootstrap/Dropdown"
import "./index.scss"
import Export from "./Export"
import { useAppDispatch, useAppSelector } from "app/hooks"
import {
  filter,
  search,
  fetchTransactions,
  selectQuery,
} from "app/transactionsSlice"

type DateRange = {
  startDate?: Date | undefined
  endDate?: Date | undefined
  key?: string | undefined
}[]

type CustomMenuProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  labeledBy?: string
}

type CustomToggleProps = {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {}
}

let timer: NodeJS.Timeout

const TransactionFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)

  const CustomToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLButtonElement>) => (
      <button
        className="btn btn-primary filter-dropdown-toggler"
        type="button"
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
          if (props.onClick) props.onClick(e)
        }}
      >
        Filters
        <span className="ms-2">
          <i className="bi-chevron-down"></i>
        </span>
      </button>
    )
  )

  const CustomMenu = React.forwardRef(
    (props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
      const [min, setMin] = useState<number | undefined>(query.filter.min || undefined)
      const [max, setMax] = useState<number | undefined>(query.filter.max || undefined)
      const [dateRange, setDateRange] = useState<DateRange>([
        {
          startDate: undefined,
          endDate: undefined,
          key: "selection",
        },
      ])

      const handleResetButtonClick = () => {
        setMin(undefined)
        setMax(undefined)
        setDateRange([
          {
            startDate: undefined,
            endDate: undefined,
            key: "selection",
          },
        ])
        const filterObj = {
          min: null,
          max: null,
          startDate: null,
          endDate: null,
        }
        dispatch(filter(filterObj))
        dispatch(fetchTransactions())
      }

      const handleFilterFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        // const filterObj: IFilter = {
        //   amount: {
        //     min,
        //     max,
        //   },
        //   date: {
        //     startDate: new Date(dateRange[0].startDate || 0).valueOf(),
        //     endDate: new Date(dateRange[0].endDate || 0).valueOf(),
        //   },
        // }
        const filterObj: IFilter = {
          min: min ? Number(min) : null,
          max: max ? Number(max) : null,
          startDate: dateRange[0].startDate
            ? new Date(dateRange[0].startDate).valueOf()
            : null,
          endDate: dateRange[0].endDate
            ? new Date(dateRange[0].endDate).valueOf()
            : null,
        }
        dispatch(filter(filterObj))
        dispatch(fetchTransactions({ ...query, filter: filterObj }))
      }
      return (
        <div
          ref={ref}
          style={props.style}
          className={props.className + " px-3"}
          aria-labelledby={props.labeledBy}
        >
          <form action="" onSubmit={handleFilterFormSubmit}>
            <div className="row mb-3">
              <label htmlFor="" className="mb-2">
                Amount
              </label>
              <div className="col-6">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Min"
                  value={min || ""}
                  onChange={(e) => setMin(Number(e.target.value))}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Max"
                  value={max || ""}
                  onChange={(e) => setMax(Number(e.target.value))}
                />
              </div>
            </div>
            <hr />
            <label htmlFor="" className="mb-2 d-block">
              Date
            </label>
            <DateRangePicker
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              showDateDisplay={false}
              ranges={dateRange}
              direction="horizontal"
            />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-danger px-5 me-2"
                onClick={handleResetButtonClick}
              >
                Reset
              </button>
              <button className="btn btn-primary px-5" type="submit">
                Filter
              </button>
            </div>
          </form>
        </div>
      )
    }
  )

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-5 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search transaction"
            value={query.search}
            onChange={(e) => {
              dispatch(search(e.target.value))
              clearTimeout(timer)
              timer = setTimeout(
                () =>
                  dispatch(
                    fetchTransactions({ ...query, search: e.target.value })
                  ),
                1500
              )
            }}
          />
        </div>
        <div className="col-md-3">
          <Dropdown autoClose="inside">
            <Dropdown.Toggle
              as={CustomToggle}
              id="dropdown-custom-components"
            ></Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}></Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-md-3 ms-auto text-end">
          <Export />
        </div>
      </div>
    </div>
  )
}

export default TransactionFilter
