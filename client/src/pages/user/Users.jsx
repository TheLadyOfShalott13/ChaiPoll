import React from 'react'
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"

const DisplayUserTable = ({ type }) => {

    const thead = ['id','name','department'];
    const options_name = 'user';
    const tbody  = []
    //const tbody  = useFetch(`user/list`)?.data

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Users</h1>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayUserTable
