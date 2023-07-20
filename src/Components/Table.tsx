import { useEffect, useMemo } from "react"

//@ts-ignore
import {useTable, usePagination, Column}  from "react-table"
const Table = ({columns, data}: {columns: readonly Column<Record<any, any>>[], data: Array<Record<any,any>>})=> {
       columns = useMemo(()=> columns, [columns])
       data = useMemo(()=> data, [data])
   
        const tableInstance = useTable({columns, data}, usePagination)
 
         const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            pageOptions,
            page,
            state: {pageIndex, pageSize},
            gotoPage, 
            previousPage,
            nextPage,
            setPageSize,
            canPreviousPage,
            canNextPage

           
         } = tableInstance as any

         useEffect(()=> {
            setPageSize(10)
         }, [tableInstance])
          return (
            <div style={{width: "90%", height: "400px", overflow: "scroll"}}>
             <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup:any) => (

                        <tr {...headerGroup.getHeaderGroupProps()}>
                             {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}
                                style={{
                                    borderBottom:'solid 3px red',
                                    background:'aliceblue',
                                    color:'black',
                                    fontWeight:'bold',
                                }}
                                >
                                  {// Render the header
                                  column.render('Header')}
                                   

                                </th>
                             ))}
                        </tr>
                    )


                    )}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td 
                                        {...cell.getCellProps()}
                                         style={{
                                            padding: "10px",
                                            border:'solid 1px gray',
                                            background:'papayawhip'
                                         }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}

                            </tr>
                        )
                    })}

                </tbody>
            </table>
            </div>
         )
}
 export default Table