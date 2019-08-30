import React, {Component} from 'react';
import AdminTableItem from "./adminTableItem";

class AdminTable extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md">
                        <h4>Kért szabadságok:</h4>
                        <div className="table-responsive">
                            <table id="mytable" className="table table-bordred table-striped">
                                <thead>
                                <th>Név</th>
                                <th>Ettől</th>
                                <th>Eddig</th>
                                <th>Leírás</th>
                                <th>Ekkor kérte</th>
                                <th>Állapot</th>
                                <th>Módosítás</th>
                                <th>Törlés</th>
                                </thead>
                                <tbody>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default AdminTable;